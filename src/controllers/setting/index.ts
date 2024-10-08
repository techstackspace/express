import { Request, Response } from 'express';
import Settings from '../../models/setting';

const getSettings = async (_req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const createOrUpdateSettings = async (req: Request, res: Response) => {
  try {
    const { theme, profileVisibility, dataSharing } = req.body;

    let settings = await Settings.findOne();
    if (settings) {
      settings.theme = theme || settings.theme;
      settings.profileVisibility =
        profileVisibility || settings.profileVisibility;
      settings.dataSharing =
        dataSharing !== undefined ? dataSharing : settings.dataSharing;
      await settings.save();
      return res.json({ message: 'Settings updated successfully', settings });
    } else {
      settings = new Settings({ theme, profileVisibility, dataSharing });
      await settings.save();
      return res
        .status(201)
        .json({ message: 'Settings created successfully', settings });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteSettings = async (_req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndDelete();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.json({ message: 'Settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { getSettings, createOrUpdateSettings, deleteSettings };
