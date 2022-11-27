import { Router } from 'express';
import {
  confirmOTP,
  doTransaction,
  getTransaction,
} from '@controller/v1/transaction/transaction.service';

const router = Router();
router.route('/').get(getTransaction).post(doTransaction).put(confirmOTP);

export default router;
