import { Router } from 'express';
const router = Router();

import { createPersonalForm, getPersonalFormByUserID, searchPersonalFomrs } from '../controllers/personal-form.controller';

router.route('/')
    .post(createPersonalForm);

router.route('/:userId')
    .get(getPersonalFormByUserID);

router.route('/search')
    .post(searchPersonalFomrs);

export default router;