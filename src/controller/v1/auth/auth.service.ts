import { NextFunction, Request, Response } from 'express';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import { cookieFlags } from '@config/cookie';
import User from '@model/user.model';
import redisClient from '@config/redis';
import createError from 'http-errors';
import passport from 'passport';
import axios from "axios";

const AUTH_API = `${process.env.ACCOUNT_API}/api/v1/auth`;

export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await axios.post(`${AUTH_API}/login`, _req.body);
    const _id = result.data.data._id;
    const accessToken = signAccessToken({
      _id,
    });
    const refreshToken = signRefreshToken({ _id});
    await redisClient.set(_id, refreshToken);
    res.cookie('accessToken', accessToken, cookieFlags);
    res.cookie('refreshToken', refreshToken, cookieFlags);
    return res.json({
      msg: 'Login success',
    });
  } catch (e ) {
    if (axios.isAxiosError(e)){
      return next(createError(e.response.status, e.response.data.msg));
    }
    return next(e);
  }
};

export const register = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await axios.post(`${AUTH_API}/register`, _req.body);
    return res.json({ msg: 'Register success' });
  } catch (e ) {
    if (axios.isAxiosError(e)){
      return next(createError(e.response.status, e.response.data.msg));
    }
    return next(e);
  }
};

export const renewRefreshToken = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = _req.cookies['refreshToken'];
    const userId = verifyRefreshToken(refreshToken);

    //Error with refresh token
    if (!userId)
      return next(
        new createError.Unauthorized(
          'Something wrong with your token, please try login again',
        ),
      );
    const oldRefreshToken = await redisClient.get(userId);
    if (oldRefreshToken !== refreshToken) {
      await redisClient.del(userId);
      return next(
        new createError.Unauthorized(
          'Something wrong with your session, please try login again',
        ),
      );
    }

    //Refresh token legit
    const newAccessToken = signAccessToken({ _id: userId });
    const newRefreshToken = signRefreshToken({ _id: userId });
    res.cookie('accessToken', newAccessToken, cookieFlags);
    res.cookie('refreshToken', newRefreshToken, cookieFlags);
    await redisClient.set(userId, newRefreshToken);
    return res.json({ msg: 'Get access token successfully' });
  } catch (e) {
    return next(e);
  }
};

export const googleAuth = passport.authenticate('google', {
  session: false,
  scope: ['email', 'profile'],
});

export const googleCallback = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = _req.user['emails'][0].value;
    if (!email)
      return next(
        new createError.InternalServerError(
          'Something went wrong with google authentication',
        ),
      );
    const _User = await User.findOne({ email: email });
    if (!_User)
      return res.status(401).json({
        msg: 'Account not exist, redirect to register',
        data: { email: email },
      });
    const accessToken = signAccessToken({
      _id: _User._id,
    });
    const refreshToken = signRefreshToken({ _id: _User._id });
    await redisClient.set(_User._id.toString(), refreshToken);
    res.cookie('accessToken', accessToken, cookieFlags);
    res.cookie('refreshToken', refreshToken, cookieFlags);
    return res.json({
      msg: 'Login success via google',
    });
  } catch (e) {
    return next(e);
  }
};
