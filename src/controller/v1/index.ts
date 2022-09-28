import { Router, Response, Request } from "express";
import UserRouter from './user/user.router';
const router = Router();

// v1 api router
router.use("/user", UserRouter);

router.route("/")
  .get((_req: Request, res: Response) => {
    return res.json({ msg: "Player dual API v1" });
  });

export default router;