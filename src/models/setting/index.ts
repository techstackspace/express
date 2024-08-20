import { Document, Schema, model } from 'mongoose';
import ISetting from './interface';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

const ProfileSettingsSchema = new Schema<ISetting & Document>(
  {
    theme: {
      type: String,
      enum: Object.values(Theme),
      default: Theme.System,
    },
    profileVisibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },
    dataSharing: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ProfileSettings = model('ProfileSettings', ProfileSettingsSchema);

export default ProfileSettings;
