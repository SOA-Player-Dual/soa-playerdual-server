import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const getAllPlayer = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(_req.query?.searchKey);
    if (_req.query?.searchKey) {
      const { data } = await apiClient(
        `/api/search?searchKey=${_req.query?.searchKey}`,
      );
      return res.json({ msg: 'Get players data', data });
    }
    const { data } = await apiClient.get('/api/user');
    return res.json({ msg: 'Get all player data', data });
  } catch (e) {
    return next(e);
  }
};

export const ratePlayer = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { comment, rate } = _req.body;
    const { data } = await apiClient.post('/api/rating', {
      user: res.locals.id,
      player: _req.params.id,
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
    const { data } = await apiClient.get(`/api/rating/${_req.params.id}`);
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
    const { data } = await apiClient.get(
      `/api/follow/follower/${_req.params.id}`,
    );
    return res.json({ msg: 'Get follower by id success', data });
  } catch (e) {
    return next(e);
  }
};

export const followPlayer = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post(`/api/follow`, {
      user_id: res.locals.id,
      player_id: _req.params.id,
    });
    return res.json({ msg: 'Follow player success', data });
  } catch (e) {
    return next(e);
  }
};

export const unFollow = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.put(`/api/follow`, {
      user_id: res.locals.id,
      player_id: _req.params.id,
    });
    return res.json({ msg: 'Unfollow player success', data });
  } catch (e) {
    return next(e);
  }
};

export const getAllDonate = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/donate/${_req.params.id}`);
    return res.json({ msg: 'Top donate', data });
  } catch (e) {
    return next(e);
  }
};

export const donate = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { money, displayName, message } = _req.body;
    const { data } = await apiClient.post(`/api/donate`, {
      user: res.locals.id,
      player: _req.params.id,
      money,
      displayName,
      message,
    });
    return res.json({ msg: 'Donate success', data });
  } catch (e) {
    return next(e);
  }
};
