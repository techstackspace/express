import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import User from '../../models/user';
import { sign } from 'jsonwebtoken';
import { encrypt } from '../../utils';

const getAllUsers = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'desc',
    search,
    name,
    username,
    email,
  } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const sortOrder = order === 'asc' ? 1 : -1;

  const query: any = {};

  if (name) {
    query.name = { $regex: new RegExp(name as string, 'i') };
  }
  
  if (username) {
    query.username = { $regex: new RegExp(username as string, 'i') };
  }

  if (email) {
    query.email = { $regex: new RegExp(email as string, 'i') };
  }

  if (search) {
    query.$or = [
      { name: { $regex: new RegExp(search as string, 'i') } },
      { username: { $regex: new RegExp(search as string, 'i') } },
      { email: { $regex: new RegExp(search as string, 'i') } },
    ];
  }

  try {
    const users = await User.find(query)
      .sort({ [sort as string]: sortOrder })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
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
    const hashedPassword = await hash(password, 10);
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

const loginUser = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const user = isEmail
      ? await User.findOne({ email: identifier })
      : await User.findOne({ username: identifier });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '15d' }
    );

    const encryptedToken = encrypt(token);

    res.cookie('token', encryptedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json({ message: 'Logout successful' });
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

export {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
};
