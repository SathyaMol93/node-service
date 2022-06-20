import { Router } from 'express';
import { getUserByNIC, saveUser } from '../controllers/user.controller';
const router = Router();

router.route('/')
    .post(saveUser);


router.route('/:nic')
    .get(getUserByNIC);
export default router;