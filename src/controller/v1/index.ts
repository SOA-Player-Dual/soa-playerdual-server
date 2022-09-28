import { Router, Response, Request } from 'express';
import UserRouter from './user/user.router';
import RefreshRouter from '@controller/v1/refesh/refresh.router';

const router = Router();

// v1 api router
router.use('/user', UserRouter);
router.use('/refresh-token', RefreshRouter);

router.route('/').get((_req: Request, res: Response) => {
  return res.json({ msg: 'Player dual API v1' });
});

export default router;
