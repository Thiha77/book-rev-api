import { Response, NextFunction } from 'express';
import { AuthRequest } from "./authMiddleware";

export function permissionMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    if (!req.user || req.user.isAdmin == false) {
      res.status(403).json({ message: 'Resource Forbidden' });
      return;
    }
    next();
}