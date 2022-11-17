import { Router } from 'express';
import {
  editUserInfo, followPlayer, getFollowing,
  getUserById,
  getUserByUrlCode, otpVerify, sendOTP,
} from '@controller/v1/user/user.service'

const router = Router();

router.route('/').get(/*getAllUser*/).put(editUserInfo);
router.route('/verification').get(sendOTP).post(otpVerify);
router.route('/following').get(getFollowing).post(followPlayer);
router.route('/id/:id').get(getUserById);
router.route('/:urlCode').get(getUserByUrlCode);

export default router;
