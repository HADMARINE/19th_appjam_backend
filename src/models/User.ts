import { model, Schema, Model, Document } from 'mongoose';

const userSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  enckey: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    default: []
  },
  credit: {
    type: Number,
    default: 0
  },
  engagedDate: {
    type: Number,
    required: true
  }
});

export interface UserDocument extends Document {
  uid: string;
  password: string;
  name: string;
  enckey: string;
  email: string;
  phone: string;
  data: Array<any>;
  credit: number;
  engagedDate: number;
}

const User: Model<UserDocument> = model('user', userSchema);

export default User;
