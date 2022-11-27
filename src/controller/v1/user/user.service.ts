import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const getUser = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/user/id/${res.locals.id}`);
    return res.json({ msg: 'Get user data', data });
  } catch (e) {
    return next(e);
  }
};

export const getUserById = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/user/id/${_req.params.id}`);
    return res.json({ msg: 'Get user data by id', data });
  } catch (e) {
    return next(e);
  }
};
export const getUserByUrlCode = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/user/${_req.params.urlCode}`);
    return res.json({ msg: 'Get user data by urlcode', data });
  } catch (e) {
    return next(e);
  }
};

export const editUserInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.put(
      `/api/user/${res.locals.id}`,
      _req.body,
    );
    return res.json({ msg: 'Edit user data', data });
  } catch (e) {
    return next(e);
  }
};

export const sendOTP = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post('/api/otp', {
      user_id: res.locals.id,
      mail: _req.body.mail,
    });
    res.json({ msg: 'Send otp success, check your email', data });
  } catch (e) {
    next(e);
  }
};

export const otpVerify = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post('/api/otp/verify', {
      user_id: res.locals.id,
      otp: _req.body.otp,
    });
    return res.json({ msg: 'Verify success', data });
  } catch (e) {
    return next(e);
  }
};

export const getFollowing = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(
      `/api/follow/following/${res.locals.id}`,
    );
    return res.json({ msg: 'Following data', data });
  } catch (e) {
    return next(e);
  }
};

export const editGameList = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post('/api/game', {
      player: res.locals.id,
      game: _req.body.game,
    });
    res.json({ msg: 'Edit game list success', data });
  } catch (e) {
    return next(e);
  }
};

export const editBio = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.put(
      `/api/post/${res.locals.id}`,
      _req.body,
    );
    return res.json({ msg: 'Edit bio success', data });
  } catch (e) {
    return next(e);
  }
};

export const banUser = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (_req.body.status === 'banned') {
      const { data } = await apiClient.put(`/api/admin/${_req.body.id}/banned`);
      return res.json({ msg: 'Banned user', data });
    }

    const { data } = await apiClient.put(`/api/admin/${_req.body.id}/active`);
    return res.json({ msg: 'Active user', data });
  } catch (e) {
    return next(e);
  }
};
