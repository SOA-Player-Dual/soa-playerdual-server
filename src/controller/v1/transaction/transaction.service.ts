import { NextFunction, Request, Response } from 'express'
import apiClient from '@api/mainAPI'

export const getTransaction = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/transaction/${res.locals.id}`);
    console.log(`/api/transaction/${res.locals.id}`)
    return res.json({ msg: 'Get transaction', data });
  } catch (e) {
    return next(e);
  }
};

export const doTransaction = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.post(`/api/transaction`,{
      user: res.locals.id,
      amount: _req.body.amount
    });
    return res.json({ msg: 'Get transaction', data });
  } catch (e) {
    return next(e);
  }
};

export const confirmOTP = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.put(`/api/transaction/${res.locals.id}`,{
      otp: _req.body.otp
    });
    return res.json({ msg: 'Confirmed', data });
  } catch (e) {
    return next(e);
  }
};
