import { Request, Response } from "express";
import User, { IUser } from "@model/user.model";
import { compare, hash } from "@middleware/hash";

// TODO login return jwt
export const login = async (_req: Request, res: Response) => {
  const user: IUser|undefined = await User.findOne({ username: _req.body.username });
  if (!user) return res.status(404).json({msg: "Username not found", data: _req.body });
  if (!compare(_req.body.password, user.password)) return res.status(401).json({msg: "Wrong password", data: _req.body})
  return res.json({ msg: "Login success", data: user });
};

export const register = async (_req: Request, res: Response) => {
  const hashPassword = hash(_req.body.password);
  const additions = {
    password: hashPassword,
    urlCode: _req.body.nickname
  };
  if (await User.findOne({username: _req.body.username})) return res.status(401).json({msg: "Username already exist"});
  const newUser = new User({ ..._req.body, ...additions });
  await newUser.save();
  return res.json({ msg: "Register success" });
};