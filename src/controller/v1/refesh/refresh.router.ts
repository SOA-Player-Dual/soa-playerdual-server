import { Router } from 'express';
import { signTokens } from '@controller/v1/refesh/refresh.service';

const router = Router();

router.route('/').post(signTokens);

export default router;
