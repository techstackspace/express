import { Request, Response } from 'express';
import ProfileSettings from '../../models/setting';

const getProfileSettings = async (req: Request, res: Response) => {
  const { user } = req.params
  try {
    const settings = await ProfileSettings.findOne({ user });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const createOrUpdateProfileSettings = async (
  req: Request,
  res: Response
) => {
  const { user } = req.params;
  try {
    const { theme, profileVisibility, dataSharing } = req.body;

    let settings = await ProfileSettings.findOne({ user });
    if (settings) {
      settings.theme = theme || settings.theme;
      settings.profileVisibility =
        profileVisibility || settings.profileVisibility;
      settings.dataSharing =
        dataSharing !== undefined ? dataSharing : settings.dataSharing;
      await settings.save();
      return res.json({ message: 'Settings updated successfully', settings });
    } else {
      settings = new ProfileSettings({ theme, profileVisibility, dataSharing });
      await settings.save();
      return res
        .status(201)
        .json({ message: 'Settings created successfully', settings });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteProfileSettings = async (req: Request, res: Response) => {
  const { user } = req.params
  try {
    const settings = await ProfileSettings.findOneAndDelete({ user });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json({ message: 'Settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { getProfileSettings, createOrUpdateProfileSettings, deleteProfileSettings }