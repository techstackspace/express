import { Document, Schema, model } from 'mongoose';
import ISetting from './interface';

// enum Theme {
//   Light = 'light',
//   Dark = 'dark',
//   System = 'system',
// }

const ProfileSettingsSchema = new Schema<ISetting & Document>(
  {
    theme: {
      type: String,
      // enum: [Theme.Light, Theme.Dark, Theme.System],
      enum: ['light', 'dark', 'system'],
      // default: Theme.System,
      default: 'system',
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
