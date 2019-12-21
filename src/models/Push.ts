import { model, Schema, Model, Document } from 'mongoose';

const pushSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isServed: {
    type: Boolean,
    default: false
  }
});

export interface PushDocument extends Document {
  content: string;
  isServed: boolean;
}

const Push: Model<PushDocument> = model('push', pushSchema);

export default Push;
