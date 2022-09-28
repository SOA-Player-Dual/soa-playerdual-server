import { Request, Response } from "express";
import User, { IUser } from "@model/user.model";
import { compare, hash } from "@helper/hash";
import { signAccessToken, signRefreshToken } from "@helper/jwt";
import redisClient from '@config/redis';
import { cookieFlags } from "@config/cookie";

export const login = async (_req: Request, res: Response) => {
  const user: IUser | undefined = await User.findOne({
    username: _req.body.username,
  });

  //Login error
  if (!user)
    return res.status(404).json({ msg: 'Username not found', data: _req.body });
  if (!compare(_req.body.password, user.password))
    return res.status(401).json({ msg: 'Wrong password', data: _req.body });

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
    data: {},
  });
};

export const register = async (_req: Request, res: Response) => {
  const hashPassword = hash(_req.body.password);
  const additions = {
    password: hashPassword,
    urlCode: _req.body.nickname,
  };
  if (await User.findOne({ username: _req.body.username }))
    return res.status(401).json({ msg: 'Username already exist' });
  const newUser = new User({ ..._req.body, ...additions });
  await newUser.save();
  return res.json({ msg: 'Register success' });
};
