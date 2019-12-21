import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../lib/throwError';

import Push from '../../models/Push';

router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
  try {
    const push = await Push.find({ isServed: true });
    if (!push) return throwError('받아올 데이터가 없습니다.', 404);

    res.json({ data: push });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
