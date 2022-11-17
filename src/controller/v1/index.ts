import { Request, Response, Router } from 'express';
import UserRouter from '@controller/v1/user/user.router';
import AuthRouter from '@controller/v1/auth/auth.router';
import PlayerRouter from '@controller/v1/player/player.router'
import GameRouter from '@controller/v1/game/game.router'
import ContractRouter from '@controller/v1/contract/contract.router'

const router = Router();

// v1 api router
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/player', PlayerRouter)
router.use('/game', GameRouter)
router.use('/contract', ContractRouter)

router.route('/').get((_req: Request, res: Response) => {
  return res.json({ msg: 'Player dual API v1' });
});

export default router;
