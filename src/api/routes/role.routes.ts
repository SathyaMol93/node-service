import { Router } from 'express';
import { saveRole } from '../controllers/role.controller';
const router = Router();

router.route('/')
    .post(saveRole);

export default router;