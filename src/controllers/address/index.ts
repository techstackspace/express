import { Request, Response } from 'express';
import Address from '../../models/address';
import { IUser } from '../../models/user/interface';

interface AuthenticatedRequest extends Request {
  user: IUser;
}

export const createAddress = async (req: Request, res: Response) => {
  try {
    const {
      user,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (isDefault) {
      await Address.updateMany({ user }, { isDefault: false });
    }

    const newAddress = new Address({
      user,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to create address: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    address.addressLine1 = addressLine1 || address.addressLine1;
    address.addressLine2 = addressLine2 || address.addressLine2;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postalCode = postalCode || address.postalCode;
    address.country = country || address.country;

    if (isDefault && !address.isDefault) {
      await Address.updateMany({ user: address.user }, { isDefault: false });
    }
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await address.save();
    res.status(200).json(address);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to update address: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getUserAddresses = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to fetch addresses: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await Address.deleteOne({ _id: addressId });
    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to delete address: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
