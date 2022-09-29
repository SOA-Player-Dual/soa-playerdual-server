import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '@model/user.model';
import { compare, hash } from '@helper/hash';
import { signAccessToken, signRefreshToken } from '@helper/jwt';
import redisClient from '@config/redis';
import { cookieFlags } from '@config/cookie';
import createError from 'http-errors';

export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: IUser | undefined = await User.findOne({
      username: _req.body.username,
    });

    //Login error
    if (!user) return next(new createError.Unauthorized('Username not found'));
    if (!compare(_req.body.password, user.password))
      return next(new createError.Unauthorized('Wrong password'));

    //Login success
    const accessToken = signAccessToken({
      _id: user._id,
    });
    const refreshToken = signRefreshToken({ _id: user._id });
    await redisClient.set(user._id.toString(), refreshToken);
    res.cookie('accessToken', accessToken, cookieFlags);
    res.cookie('refreshToken', refreshToken, cookieFlags);
    return res.json({
      msg: 'Login success',
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
    const hashPassword = hash(_req.body.password);
    const additions = {
      password: hashPassword,
      urlCode: _req.body.nickname,
    };
    if (await User.findOne({ username: _req.body.username }))
      return next(new createError.Unauthorized('Username already exist'));
    const newUser = new User({ ..._req.body, ...additions });
    await newUser.save();
    return res.json({ msg: 'Register success' });
  } catch (e) {
    return next(e);
  }
};

export const getAllUser = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json(await User.find({}).limit(100));
  } catch (e) {
    return next(e);
  }
};
