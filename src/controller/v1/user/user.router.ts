import { Request, Response, Router } from "express";
import { login, register } from "@controller/v1/user/user.service";

const router = Router();

router.route("/")
  .get((_req: Request, res: Response)=>{
    return res.json({msg: 'Get user'});
  })
  .post((_req: Request, res: Response)=>{
    return res.json({msg: 'Post user', data: _req.body.data})
  })

router.route('/login')
  .post(login)

router.route('/register')
  .post(register)

export default router;