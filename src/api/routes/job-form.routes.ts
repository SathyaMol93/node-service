import { Router } from 'express';
import { checkPermision } from '../controllers/auth.controller';
const router = Router();

import { createJobForm, getJobFormByUserID, searchJobFomrs } from '../controllers/job-form.controller';

router.route('/')
    .post(createJobForm);

router.route('/:userId')
    .get(getJobFormByUserID);

router.route('/:userId')
    .get(getJobFormByUserID);

export default router;