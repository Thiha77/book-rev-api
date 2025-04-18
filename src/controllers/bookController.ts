import { Request, Response, NextFunction } from 'express';
import { Book } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { z } from 'zod';

const bookSchema = z.object({
    title: z.string().min(1),
    releaseDate: z.coerce.date(),
    description: z.string().min(1),
    authorId: z.number(),
});

const bookParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});
// const updateBookSchema = bookSchema.partial().extend({
//     id: z.number(),
// });

export const getBooks = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const books = await prisma.book.findMany({
            where: { isActive: true }
        });
        res.json(books);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

    try {
        const { id } = bookParamSchema.parse(req.params);
        const book = await prisma.book.findUnique({
            where: {
                id: Number(id),
                isActive: true,
            },
        });
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
}

export const createBook = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const validatedData = bookSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }
    const author = await prisma.author.findUnique({
        where: { id: validatedData.data.authorId },
    });
    if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
    }
    try {
        const book = await prisma.book.create({
            data: validatedData.data,
        });
        const data: Book = {
            ...book
        }
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const updateBook = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const { id } = bookParamSchema.parse(req.params);
    const validatedData = bookSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }
    const author = await prisma.author.findUnique({
        where: { id: validatedData.data.authorId },
    });
    if (!author) {
        res.status(404).json({ message: 'Author not found' });
        return;
    }
    try {
        const book = await prisma.book.update({
            where: {
                id: Number(id),
            },
            data: validatedData.data,
        });
        const data: Book = {
            ...book
        }
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const { id } = bookParamSchema.parse(req.params);
        const book = await prisma.book.update({
            where: {
                id: Number(id),
            },
            data:{
                isActive: false,
            }

        });
        const data: Book = {
            ...book
        }
        res.status(202).json(data);
    } catch (error) {
        next(error);
    }
    
}