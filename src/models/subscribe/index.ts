import { Document, Schema, model } from 'mongoose';
import { ICreateEmailSubscription } from './interface';

const SubscribeSchema = new Schema<ICreateEmailSubscription & Document>({
  email: { type: String, required: true, unique: true },
});

const Subscribe = model<ICreateEmailSubscription & Document>(
  'Subscribe',
  SubscribeSchema
);

export default Subscribe;
