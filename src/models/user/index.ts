import { model, Schema } from 'mongoose';
import { IUser } from './interface';

const UserSchema = new Schema<IUser & Document>(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[\w]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid username!`,
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const User = model<IUser & Document>('User', UserSchema);
export default User;
