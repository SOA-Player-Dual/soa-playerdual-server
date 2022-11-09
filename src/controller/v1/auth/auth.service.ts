import { NextFunction, Request, Response } from 'express';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import redisClient from '@config/redis';
import createError from 'http-errors';
import passport from 'passport';
import axios from 'axios';

const AUTH_API = `${process.env.ACCOUNT_API}/api/v1/auth`;

export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const axiosResponse = await axios.post(`${AUTH_API}/login`, _req.body);
    const id = axiosResponse.data.data.id;
    const accessToken = signAccessToken({
      id,
    });
    const refreshToken = signRefreshToken({ id });
    await redisClient.set(id, refreshToken);
    return res.json({
      msg: 'Login success',
      accessToken,
      refreshToken,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
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
  } catch (e) {
    if (axios.isAxiosError(e)) {
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
    const refreshToken = _req.headers.authorization.split(' ')[1];
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
    const newAccessToken = signAccessToken({ id: userId });
    const newRefreshToken = signRefreshToken({ id: userId });
    await redisClient.set(userId, newRefreshToken);
    return res.json({
      msg: 'Get access token successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
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
    const _User = {
      id: 'asdasd',
      detail: 'Wait axios call',
    };
    if (!_User)
      return res.status(401).json({
        msg: 'Account not exist, redirect to register',
        data: { email: email },
      });
    const accessToken = signAccessToken({
      id: _User.id,
    });
    const refreshToken = signRefreshToken({ id: _User.id });
    await redisClient.set(_User.id.toString(), refreshToken);
    return res.json({
      msg: 'Login success via google',
      accessToken,
      refreshToken,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status, e.response.data.msg));
    }
    return next(e);
  }
};
