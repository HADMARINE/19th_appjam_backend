import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../../lib/throwError';
import nugu from '../../../lib/nugu.json';
import TestUser from '../../../models/TestUser';
import User from '../../../models/User';
import Push from '../../../models/Push';
import Product from '../../../models/Product';
import getRandomArbitrary from '../../../lib/getRandomArbitrary';

router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
  try {
    const testuser: any = await TestUser.findOne({ boyUser: 'test1' });

    // if (!testuser) return throwError('테스트 유저 데이터가 없습니다.', 404);
    console.log(testuser);

    const boyUser = await User.findOne({ uid: 'test1' });

    if (!boyUser) return throwError('유저를 찾을 수 없습니다.', 404);

    let passedDate = (Date.now() - boyUser.engagedDate) / (1000 * 60 * 60 * 24);

    const today = new Date();

    console.log(passedDate);

    if (passedDate % 100 >= 94 && passedDate % 100 < 100) {
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
      nugu.response.output = {
        date: `오늘은 ${today.getMonth() + 1}월 ${today.getDate() +
          1}일, ${(Math.floor(passedDate / 100) + 1) * 100}일 ${100 -
          Math.ceil(
            passedDate % 100
          )}일 전 입니다. 여자친구에게 줄 선물로 추천하는 상품은 ${
          outputProduct.name
        }입니다. 가격은 ${outputProduct.price} 원입니다.`
      };

      const push = new Push({ content: '온열담요' });
      await push.save();
    } else {
      nugu.response.output = {
        date: `오늘은 ${today.getMonth() + 1}월 ${today.getDate() +
          1}일 입니다.`
      };
    }

    res.json(nugu.response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
