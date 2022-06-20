import { Router } from 'express';
const router = Router();

import { getDsDivision, getDsDivisionByDistricId } from '../controllers/ds-division.controller';

router.route('/')
    .get(getDsDivision);


router.route('/byDistricId/:districId')
    .get(getDsDivisionByDistricId);

export default router;