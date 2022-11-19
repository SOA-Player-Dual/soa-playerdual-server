import { NextFunction, Request, Response } from 'express';
import apiClient from '@api/mainAPI';

export const getAllGame = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get('/api/game');
    res.json({ msg: 'Get all game data', data });
  } catch (e) {
    next(e);
  }
};

export const addNewGame = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) =>{
  try {
    const { data } = await apiClient.post('/api/game', _req.body);
    res.json({ msg: 'Add new game', data });
  } catch (e) {
    next(e);
  }
}

export const getGameById = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await apiClient.get(`/api/game/${_req.params.id}`);
    res.json({
      msg: 'Get game data',
      data
    });
  } catch (e) {
    next(e);
  }
}
