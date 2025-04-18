import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export interface AuthRequest extends Request {
  user?: any; // You can type this better with your User interface
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token){
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const decoded = verifyJwt(token);

  if (!decoded){
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
  req.user = decoded;
  next();
}
