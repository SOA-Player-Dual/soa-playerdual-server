import { Router } from 'express';
import {
  banUser,
  editBio,
  editGameList,
  editUserInfo,
  getFollowing,
  getUser,
  getUserById,
  getUserByUrlCode,
  otpVerify,
  sendOTP,
} from '@controller/v1/user/user.service';
import isAdmin from '@middleware/isAdmin'

const router = Router();

router.route('/').get(getUser).put(editUserInfo);
router.route('/verification').get(sendOTP).post(otpVerify);
router.route('/following').get(getFollowing);
router.route('/bio').put(editBio);
router.route('/id/:id').get(getUserById);
router.route('/game').put(editGameList);
router.route('/:urlCode').get(getUserByUrlCode);
router.route('/status').put(isAdmin, banUser);

export default router;
