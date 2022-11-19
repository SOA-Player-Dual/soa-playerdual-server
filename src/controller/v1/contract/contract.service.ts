import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const getContract = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/contract/user/${res.locals.id}`);
    return res.json({ msg: 'Get user contract', data });
  } catch (e) {
    return next(e);
  }
};

export const createContract = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post('/api/contract', {
      user: res.locals.id,
      ..._req.body,
    });
    res.json({ msg: 'Create contract', data });
  } catch (e) {
    next(e);
  }
};

export const getContractByUserId = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(
      `/api/contract/user/${_req.params.id}`,
    );
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
    const { data } = await apiClient.get(
      `/api/contract/player/${_req.params.id}`,
    );
    return res.json({ msg: 'Get all player contract', data });
  } catch (e) {
    return next(e);
  }
};

export const getContractById =  async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(
      `/api/contract/${_req.params.id}`,
    );
    return res.json({ msg: 'Get contract detail', data });
  } catch (e) {
    return next(e);
  }
};

export const updateContractStatus = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.put(
      `/api/contract/${_req.params.id}`,
      {
        actor_id: res.locals.id,
        status: _req.body.status
      }
    );
    return res.json({ msg: 'Contract status updated', data });
  } catch (e) {
    return next(e);
  }
};
