import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../lib/throwError';
import User, { UserDocument } from '../../models/User';
import jwt from 'jsonwebtoken';

router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
  try {
    const token: any = req.headers['x-access-token'];
    let tokenValue: any;
    try {
      tokenValue = jwt.verify(token, process.env.TOKEN_KEY || 'tokenkey');
    } catch (error) {
      return throwError('토큰 검증에 실패했습니다.', 403);
    }

    const credit = await User.findOne({ uid: tokenValue.userId }).select(
      'credit'
    );

    res.json({ credit });

    if (!credit) {
      return throwError('유저 정보가 없습니다.', 403);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const token: any = req.headers['x-access-token'];
    const { credit } = req.body;

    let tokenValue: any;
    try {
      tokenValue = jwt.verify(token, process.env.TOKEN_KEY || 'tokenkey');
    } catch (error) {
      return throwError('토큰 검증에 실패했습니다.', 403);
    }

    await User.findOneAndUpdate(
      { uid: tokenValue.userId },
      {
        $set: {
          credit
        }
      }
    );

    res.status(201).json({ state: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
