import { Document, Schema, model } from 'mongoose';
import ISetting from './interface';

const SettingsSchema = new Schema<ISetting & Document>(
  {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
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

const Settings = model('Settings', SettingsSchema);

export default Settings;
