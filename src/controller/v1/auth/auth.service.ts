import { NextFunction, Request, Response } from 'express';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import redisClient from '@config/redis';
import authClient from '@api/authAPI';
import createError from 'http-errors';
import passport from 'passport';
import mainAPI from '@api/mainAPI';

export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await authClient.post(`/auth/login`, _req.body);
    const id = data.data.id;
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
    return next(e);
  }
};

export const register = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await authClient.post(`/auth/register`, _req.body);
    const { id, email } = data.data.user;
    mainAPI.post('/api/otp/send', { user_id: id, mail: email }).then((r) => r);
    return res.json({ msg: 'Register success' });
  } catch (e) {
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
    const { id: userId } = verifyRefreshToken(refreshToken);

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
    return next(e);
  }
};

export const changePassword = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authClient.post('/auth/password', {
      id: res.locals.id,
      ..._req.body
    });
    res.json({ msg: 'Check your email for' });
  } catch (e) {
    return next(e);
  }
};
