import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = createUserSchema.omit({ name: true });

export type UserRegisterResultPayload = Pick<User, 'id' | 'name' | 'email' >;
export type UserLoginResultPayload = Pick<User, 'id' | 'name' | 'email' | 'isAdmin'> & { token: string };

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user){
        res.status(401).json({ error: 'Invalid credentials' })
        return;
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      res.status(401).json({ error: 'Invalid credentials password' });
      return;
    } 
  
    const token = signJwt({ id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    const data: UserLoginResultPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    }
    res.json({ data });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validatedData = createUserSchema.safeParse(req.body);


  if (!validatedData.success) {
    res.status(400).json({ error: validatedData.error.errors });
    return;
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.data.email },
  });
  
  if (existingUser) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }
  const { email, password, name } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });
    const data : UserRegisterResultPayload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    res.status(201).json({ data });
};

