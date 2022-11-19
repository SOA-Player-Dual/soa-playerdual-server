import { Router } from "express";
import { googleAuth, googleCallback, login, register, renewRefreshToken } from '@controller/v1/auth/auth.service'

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/refresh').get(renewRefreshToken);
router.route('/password').post()
router.route('/google').get(googleAuth);
router.route('/google/callback').get(googleAuth, googleCallback);

export default router;
