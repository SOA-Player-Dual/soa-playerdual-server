import { Request, Response, Router } from "express";

const router = Router();

router.route("/")
  .get((_req: Request, res: Response)=>{
    return res.json({msg: 'Get user'});
  })
  .post((_req: Request, res: Response)=>{
    return res.json({msg: 'Post user', data: _req.body.data})
  })

export default router;