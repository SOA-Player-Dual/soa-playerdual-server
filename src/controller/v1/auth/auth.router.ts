import { Router } from 'express';
import {
  changePassword,
  getOTPRecover,
  googleAuth,
  googleCallback,
  login,
  recoverPassword,
  register,
  renewRefreshToken,
} from '@controller/v1/auth/auth.service';

const router = Router();

// API gateway
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/refresh').get(renewRefreshToken);
router.route('/password').post(changePassword);
router.route('/recover').post(getOTPRecover);
router.route('/recover/verification').post(recoverPassword);
router.route('/google').get(googleAuth);
router.route('/google/callback').get(googleAuth, googleCallback);

export default router;
