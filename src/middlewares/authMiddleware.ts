import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { User } from '@prisma/client';


export type LoggedInUser = Pick<User , 'id' | 'name' | 'email' | 'isAdmin'> ;

export interface AuthRequest extends Request {
  user?: LoggedInUser;
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
  req.user = decoded as LoggedInUser; // Cast to your user type
  next();
}
