import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../../models/user';

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'Missing required field' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    return res.status(201).json({ user: savedUser });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  }
};

export { getAllUsers, createUser, deleteUser };
