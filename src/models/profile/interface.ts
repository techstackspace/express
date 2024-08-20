import { Schema } from 'mongoose';

interface IPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface IProfile {
  user: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  profilePicture: string;
  bio: string;
  phoneNumber: string;
  address: IAddress;
  preferences: IPreferences;
  version: number;
}

export type { IProfile };
