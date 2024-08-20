import { IUser } from '../user/interface';

interface IAddress {
  user: IUser['_id'];
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  version: number;
}

export type { IAddress };
