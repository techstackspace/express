import { model, Schema } from 'mongoose';
import { IUser } from './interface';

const UserSchema = new Schema<IUser & Document>(
  {
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    version: { type: String, default: '1.0.0' },
  },
  { timestamps: true, versionKey: 'version' }
);

const User = model<IUser & Document>('User', UserSchema);
export default User;
