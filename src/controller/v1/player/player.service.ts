import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const ratePlayer = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { player, comment, rate } = _req.body;
    const { data } = await apiClient.post('/api/rating', {
      user: res.locals.id,
      player,
      comment,
      rate,
    });
    res.json({ msg: 'Rate success', data });
  } catch (e) {
    return next(e);
  }
};

export const getRateById = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient(`/api/rating/${_req.params.id}`);
    return res.json({ msg: 'Get rate by id success', data });
  } catch (e) {
    return next(e);
  }
};

export const getFollower = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient(`/api/follow/follower/${_req.params.id}`);
    return res.json({ msg: 'Get follower by id success', data });
  } catch (e) {
    return next(e);
  }
}
