import { Request, Response, NextFunction } from 'express';
import { Book } from '@prisma/client';
import { prisma } from '../utils/prisma';

export const getBooks = async(req: Request, res: Response, next: NextFunction) => {
    const book : Book  = {
        id: 1,
        title: 'Book Title',
        releaseDate: new Date(),
        description: 'Book Description',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
    }
    const user = await prisma.user.findMany();
    //books.push(user);
    try {
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;
    const book : Book  = {
        id: 1,
        title: 'Book Title',
        releaseDate: new Date(),
        description: 'Book Description',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
    }
    // const book = books.find((b: Book) => b.id === bookId);
    // if (!book) {
    //     return res.status(404).json({ message: 'Book not found' });
    // }
    res.json(book);
}

export const createBook = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Book created' });
}

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Book updated' });
}

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Book deleted' });
}