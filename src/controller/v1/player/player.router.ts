import { Router } from 'express';
import {
  donate,
  followPlayer,
  getAllDonate,
  getAllPlayer,
  getFollower,
  getPlayerByGame,
  getPlayerByGender,
  getRateById,
  ratePlayer,
  unFollow,
} from '@controller/v1/player/player.service';

const router = Router();

router.route('/').get(getAllPlayer);
router.route('/game/:id').get(getPlayerByGame);
router.route('/gender/:gender').get(getPlayerByGender);
router.route('/:id/rating').get(getRateById).post(ratePlayer);
router.route('/:id/follower').get(getFollower).post(followPlayer).put(unFollow);
router.route('/:id/donate').get(getAllDonate).post(donate);

export default router;
