import { Request, Response, NextFunction } from 'express';
import { Author } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { z } from 'zod';

const authorSchema = z.object({
    name: z.string().min(1),
    dob: z.coerce.date(),
    nationality: z.string().min(1)
});

const authorParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const getAuthors = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const authors = await prisma.author.findMany({
            where: { isActive: true }
        });
        res.json(authors);
    } catch (error) {
        next(error);
    }
};

export const getAuthorById = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

    try {
        const { id } = authorParamSchema.parse(req.params);
        const author = await prisma.author.findUnique({
            where: {
                id: Number(id),
                isActive: true,
            },
        });
        if (!author) {
            res.status(404).json({ message: 'author not found' });
            return;
        }
        res.json(author);
    } catch (error) {
        next(error);
    }
}

export const createAuthor = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const validatedData = authorSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }

    try {
        const author = await prisma.author.create({
            data: validatedData.data,
        });
        const data: Author = {
            ...author
        }
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const updateAuthor = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const { id } = authorParamSchema.parse(req.params);
    const validatedData = authorSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }

    try {
        const author = await prisma.author.update({
            where: {
                id: Number(id),
            },
            data: validatedData.data,
        });
        const data: Author = {
            ...author
        }
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const deleteAuthor = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const { id } = authorParamSchema.parse(req.params);
        const author = await prisma.author.update({
            where: {
                id: Number(id),
            },
            data:{
                isActive: false,
            }

        });
        const data: Author = {
            ...author
        }
        res.status(202).json(data);
    } catch (error) {
        next(error);
    }
    
}