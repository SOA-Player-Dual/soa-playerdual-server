import { Request, Response } from 'express';
import redisClient from '@config/redis';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import { cookieFlags } from '@config/cookie';

export const signTokens = async (_req: Request, res: Response) => {
  const refreshToken = _req.cookies['refreshToken'];
  const userId = verifyRefreshToken(refreshToken);

  //Error with refresh token
  if (!userId) return res.status(403).json({ msg: 'Missing token' });
  const oldRefreshToken = await redisClient.get(userId);
  if (oldRefreshToken !== refreshToken) {
    await redisClient.del(userId);
    return res
      .status(403)
      .json({ msg: 'Something wrong with your session, please login again' });
  }

  //Refresh token legit
  const newAccessToken = signAccessToken({ _id: userId });
  const newRefreshToken = signRefreshToken({ _id: userId });
  res.cookie('accessToken', newAccessToken, cookieFlags);
  res.cookie('refreshToken', newRefreshToken, cookieFlags);
  await redisClient.set(userId, newRefreshToken);
  return res.json({ msg: 'Get access token successfully' });
};
