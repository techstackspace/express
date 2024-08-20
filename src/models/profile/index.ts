import { Document, model, Schema } from 'mongoose';
import { IProfile } from './interface';

const ProfileSchema = new Schema<IProfile & Document>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    phoneNumber: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    preferences: {
      language: { type: String, default: 'en' },
      timezone: { type: String, default: 'UTC' },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
    },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Profile = model<IProfile & Document>('Profile', ProfileSchema);
export default Profile;
