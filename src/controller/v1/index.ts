import { Router, Response, Request } from "express";
import UserRouter from './user/user.router';
const router = Router();

router.route("/")
  .get((_req: Request, res: Response) => {
    return res.json({ msg: "Player dual API v1" });
  });

router.use("/user", UserRouter);

export default router;