import { Router } from 'express';
const router = Router();

import { getGnDivision, getGnDivisionByDivisionCode } from '../controllers/gn-division.controller';

router.route('/')
    .get(getGnDivision);

router.route('/byDsDivisionCode/:dsDivisionCode')
    .get(getGnDivisionByDivisionCode);

export default router;