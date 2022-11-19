import jwt from 'jsonwebtoken'
import 'dotenv/config'
import createError from 'http-errors'

export interface IJwt {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const signAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1d' });
};

export const signRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1y' });
};

export const verifyAccessToken = (token: string):IJwt => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (err) {
    throw createError(401, 'Invalid access token');
  }
};

export const verifyRefreshToken = (token: string):IJwt => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET) as IJwt;
  } catch (err) {
    throw createError(401, 'Invalid refresh token');
  }
};
