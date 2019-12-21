import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../lib/throwError';
import nugu from '../../lib/nugu.json';

router.use(bodyParser.json());

router.post('/', (req: any, res: any) => {
  nugu.response.output = { test: '접속 성공' };
  console.log('post');
  res.json(nugu.response);
});

router.get('/', (req, res) => {
  nugu.response.output = { test: '접속 성공' };
  console.log('get');
  res.json(nugu.response);
});

router.use('/', (req, res) => {
  nugu.response.output = { test: '접속 성공' };
  console.log('use');
  return res.json(nugu.response);
});

module.exports = router;
