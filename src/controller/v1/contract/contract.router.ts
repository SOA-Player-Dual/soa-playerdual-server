import { Router } from 'express';
import {
  createContract,
  getContract,
  getContractById,
  getContractByPlayerId,
  getContractByUserId,
  updateContractStatus,
} from '@controller/v1/contract/contract.service';

const router = Router();

router.route('/').get(getContract).post(createContract);
router.route('/user/:id').get(getContractByUserId);
router.route('/player/:id').get(getContractByPlayerId);
router.route('/:id').get(getContractById).put(updateContractStatus);

export default router;
