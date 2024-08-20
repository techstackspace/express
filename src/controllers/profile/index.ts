import { Request, Response } from 'express';
import Profile from '../../models/profile';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'username email'
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      user,
      firstName,
      lastName,
      profilePicture,
      bio,
      phoneNumber,
      address,
      preferences,
    } = req.body;

    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: 'Profile already exists for this user' });
    }

    const newProfile = new Profile({
      user,
      firstName,
      lastName,
      profilePicture,
      bio,
      phoneNumber,
      address,
      preferences,
    });

    await newProfile.save();
    res
      .status(201)
      .json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { user: userId, ...updateData } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { user: userId } = req.body;
    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const patchProfile = async (req: Request, res: Response) => {
  try {
    const { user: userId, ...updateData } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
