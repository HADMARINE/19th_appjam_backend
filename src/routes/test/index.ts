import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../lib/throwError';

router.use(bodyParser.json());

router.post('/', (req: any, res: any) => {
  res.json({ test: '접속 성공' });
});

router.get('/', (req, res) => {
  res.json({ test: '접속성공' });
});

module.exports = router;
