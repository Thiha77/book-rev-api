import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from "@prisma/client/runtime/library";

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientInitializationError) {
    
    logger.error("Prisma Client Known Request Error", err.message);
    res.status(400).json({ message: "Database connection error"});
    return;
  }
  logger.error(err.message || 'Internal Server Error');
  res.status(err.status || 500).json({
    message: 'Internal Server Error',
  });
};