import { Router } from 'express';
import { getPersonalFormByUserID } from '../controllers/personal-form.controller';
const router = Router();

import { createPublicForm, getPublicFormByUserID, searchPublicFomrs } from '../controllers/public-form.controller';

router.route('/')
    .post(createPublicForm);


router.route('/:userId')
    .get(getPublicFormByUserID);


router.route('/search')
    .post(searchPublicFomrs);

export default router;