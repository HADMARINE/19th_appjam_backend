import { model, Schema, Model, Document } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  flag: {
    type: Number,
    default: 1
  }
});

export interface ProductDocument extends Document {
  name: string;
  category: string;
  price: number;
}

const Product: Model<ProductDocument> = model('product', productSchema);

export default Product;
