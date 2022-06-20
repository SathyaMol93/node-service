import { Router } from 'express';
import { checkToken, login } from '../controllers/auth.controller';
import { saveUser } from '../controllers/user.controller';
const router = Router();

router.route('/token')
    .post(login);

router.route('/signin')
    .post(saveUser);


router.route('/checkToken')
    .get(checkToken);

export default router;