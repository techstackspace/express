import { Document, model, Schema } from 'mongoose';
import { IAddress } from './interface';

const AddressSchema = new Schema<IAddress & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Address = model<IAddress & Document>('Address', AddressSchema);
export default Address;
