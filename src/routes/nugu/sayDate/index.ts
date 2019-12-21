import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../../lib/throwError';
import nugu from '../../../lib/nugu.json';
import TestUser from '../../../models/TestUser';
import User from '../../../models/User';
import Push from '../../../models/Push';

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
      nugu.response.output = {
        date: `오늘은 ${today.getMonth() +
          1}월 ${today.getDate()}일, ${(Math.floor(passedDate / 100) + 1) *
          100}일, ${100 -
          Math.ceil(
            passedDate % 100
          )}일전 입니다. 여자친구에게 따뜻한 USB 온열 무릎담요를 선물해보세요. 가격은 28800 원입니다.`
      };

      const push = new Push({ content: '온열담요' });
      await push.save();
    } else {
      nugu.response.output = {
        date: `오늘은 ${today.getMonth() + 1}월 ${today.getDate()}일 입니다.`
      };
    }

    res.json(nugu.response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
