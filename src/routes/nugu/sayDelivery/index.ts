import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../../lib/throwError';
import nugu from '../../../lib/nugu.json';
import Product from '../../../models/Product';
import getRandomArbitrary from '../../../lib/getRandomArbitrary';

router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
  try {
    const product: any = await Product.find({ flag: 1 });
    console.log(product);
    if (product.length === 0) {
      return throwError('상품 데이터가 존재하지 않습니다.', 404, {
        logError: true,
        data: {}
      });
    }

    const randomNumber = getRandomArbitrary(0, product.length);

    const outputProduct = product[randomNumber];
    console.log(outputProduct, '|||', randomNumber);

    const hubs = [
      '옥천 허브',
      '곤지암 허브',
      '판매자',
      '배송지',
      '부천 웰시네 집'
    ];
    const hubsRandomNumber = getRandomArbitrary(0, hubs.length);

    nugu.response.output = {
      delivery: `현재 배송중인 상품은 ${outputProduct.name} 입니다. 현재 ${hubs[hubsRandomNumber]} 에 있습니다.`
    };
    res.json(nugu.response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
