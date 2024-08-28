import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ message: 'Token is not valid' });
    } else {
      return res.status(500).json({ error: 'Unknown error occured' });
    }
  }
};

export { authenticateToken };
