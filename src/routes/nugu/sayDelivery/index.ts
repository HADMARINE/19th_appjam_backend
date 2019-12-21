import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../../lib/throwError';
import nugu from '../../../lib/nugu.json';

router.use(bodyParser.json());

router.post('/', (req: any, res: any) => {
  nugu.response.output = {
    delivery: '현재 배송중인 상품은 커플링 입니다. 현재 옥천 허브 에 있습니다.'
  };
  res.json(nugu.response);
});

module.exports = router;
