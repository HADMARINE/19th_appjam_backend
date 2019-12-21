import { model, Schema, Model, Document } from 'mongoose';

const presentSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  recieverId: {
    type: String,
    required: true
  }
});

export interface PresentDocument extends Document {
  address: string;
  title: string;
  content: string;
  productId: string;
  recieverId: string;
}

const Present: Model<PresentDocument> = model('present', presentSchema);

export default Present;
