import { Router } from "express";
import { getAllGame, getGameById } from '@controller/v1/game/game.service'

const router = Router();

// TODO: store new game
router.route('/').get(getAllGame);
router.route('/:id').get(getGameById);


export default router;
