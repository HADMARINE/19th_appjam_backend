import { model, Schema, Model, Document } from 'mongoose';

const testUserSchema = new Schema({
  boyUser: {
    type: String,
    required: true
  },
  girlUser: {
    type: String,
    required: true
  }
});

export interface TestUserDocument extends Document {
  boyUser: string;
  girlUser: string;
}

const TestUser: Model<TestUserDocument> = model('testuser', testUserSchema);

export default TestUser;
