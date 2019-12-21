import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
import throwError from '../../lib/throwError';
import Product from '../../models/Product';

router.use(bodyParser.json());

router.post('/', async (req, res, next) => {
  try {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
      return throwError('필수 요소가 입력되지 않았습니다.', 400);
    }
    const product = new Product({ name, category, price });
    await product.save();
    res.send(true);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
