import { Request, Response } from 'express';
import User from '../../../../models/user';

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required field' });
  }

  try {
    const user = new User({
      username,
      email,
      password,
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

export default register;
