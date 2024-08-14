import { model, Schema } from 'mongoose';
import { IUser } from './interface';

const UserSchema = new Schema<IUser & Document>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser & Document>('User', UserSchema);
export default User;
