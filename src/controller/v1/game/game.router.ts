import { Router } from "express";
import { addNewGame, getAllGame, getGameById } from '@controller/v1/game/game.service'
import isAdmin from '@middleware/isAdmin'

const router = Router();

router.route('/').get(getAllGame).post(isAdmin, addNewGame);
router.route('/:id').get(getGameById);


export default router;
