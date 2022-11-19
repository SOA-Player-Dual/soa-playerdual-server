import { Router } from 'express';
import {
  editUserInfo, getFollowing, getUser,
  getUserById,
  getUserByUrlCode, otpVerify, sendOTP,
} from '@controller/v1/user/user.service'

const router = Router();

router.route('/').get(getUser).put(editUserInfo);
router.route('/verification').get(sendOTP).post(otpVerify);
router.route('/following').get(getFollowing);
router.route('/id/:id').get(getUserById);
router.route('/:urlCode').get(getUserByUrlCode);

export default router;
