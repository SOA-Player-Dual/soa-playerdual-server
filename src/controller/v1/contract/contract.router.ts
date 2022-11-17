import { Router } from "express";
import { getContractByPlayerId, getContractByUserId } from '@controller/v1/contract/contract.service'

const router = Router();

router.route('/').get(/*Get contract by id*/)
router.route('/user/:id').get(getContractByUserId)
router.route('/player/:id').get(getContractByPlayerId)

export default router;
