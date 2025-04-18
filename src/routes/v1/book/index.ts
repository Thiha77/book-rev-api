import { Router } from 'express';
import {permissionMiddleware} from '../../../middlewares/permissionMiddleware';
import { 
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook 
} 
from '../../../controllers/bookController';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', permissionMiddleware, createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
