import { Router } from 'express';
import { permissionMiddleware } from '../../../middlewares/permissionMiddleware';
import { 
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor 
} 
from '../../../controllers/authorController'

const router = Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', permissionMiddleware, createAuthor);
router.put('/:id', permissionMiddleware, updateAuthor);
router.delete('/:id', permissionMiddleware, deleteAuthor);

export default router;
