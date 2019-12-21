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
  }
});

export interface ProductDocument extends Document {
  name: string;
  category: string;
  price: number;
}

const Product: Model<ProductDocument> = model('product', productSchema);

export default Product;
