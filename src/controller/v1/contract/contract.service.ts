import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const getContract = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(``);
    return res.json({ msg: 'Get contract detail', data });
  } catch (e) {
    return next(e);
  }
};

export const getContractByUserId = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/contract/user/${_req.params.id}`);
    return res.json({ msg: 'Get all user contract', data });
  } catch (e) {
    return next(e);
  }
};

export const getContractByPlayerId = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/contract/player/${_req.params.id}`);
    return res.json({ msg: 'Get all player contract', data });
  } catch (e) {
    return next(e);
  }
};
