import { Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  otp?: string;
  otpExpires?: Date;
  resetToken?: string;
  resetTokenExpires?: Date;
  isVerified?: boolean;
  version: number;
}

export type { IUser };
