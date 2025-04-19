import { Request, Response, NextFunction } from 'express';
import { Review } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { z } from 'zod';
import { AuthRequest } from '../middlewares/authMiddleware';

export const reviewSchema = z.object({
    rating: z.number().int().min(1).max(5), // rating is 1–5
    content: z.string().max(300),
    bookId: z.number().int().positive()
  });

export const updateReviewSchema = reviewSchema.pick({ rating:true, content:true });

const reviewParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});


export const getReviews = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

    const reviews = await prisma.review.findMany({
        where: { isActive: true }
    });
    res.json(reviews);
};

export const getReviewById = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

        const { id } = reviewParamSchema.parse(req.params);
        const review = await prisma.review.findUnique({
            where: {
                id: Number(id),
                isActive: true,
            },
        });
        if (!review) {
            res.status(404).json({ message: 'review not found' });
            return;
        }
        res.json(review);
}

export const createReview = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const validatedData = reviewSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const book = await prisma.book.findUnique({
        where: { id: validatedData.data.bookId },
    });
    if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
    }
        const review = await prisma.review.create({
            data: {
                ...validatedData.data,
                userId: req.user.id,
            },
        });
        const data: Review = {
            ...review
        }
        res.status(201).json(data);
}

export const updateReview = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
    const { id } = reviewParamSchema.parse(req.params);
    const validatedData = updateReviewSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({ error: validatedData.error.errors });
      return;
    }

    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const reviewToUpdate = await prisma.review.findUnique({
        where: { id: Number(id) },
    });
    
    if(req.user.id !== reviewToUpdate?.userId){
        res.status(403).json({ message: 'You are not authorized to update this review' });
        return;
    }
        const review = await prisma.review.update({
            where: {
                id: Number(id),
            },
            data: validatedData.data,
        });
        const data: Review = {
            ...review
        }
        res.status(201).json(data);
}

export const deleteReview = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
        const { id } = reviewParamSchema.parse(req.params);

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    
        const reviewToDelete = await prisma.review.findUnique({
            where: { id: Number(id) },
        });

        if(req.user.id !== reviewToDelete?.userId){
            res.status(403).json({ message: 'You are not authorized to delete this review' });
            return;
        }

        const review = await prisma.review.update({
            where: {
                id: Number(id),
            },
            data:{
                isActive: false,
            }

        });
        const data: Review = {
            ...review
        }
        res.status(202).json(data);
}