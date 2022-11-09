import { NextFunction, Request, Response } from 'express';

export const getAllUser = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.json({msg: "Users data"})
  } catch (e) {
    return next(e);
  }
};
