import express from 'express';
import { createUserAction, readUsersAction, readUserAction, updateUserAction, deleteUserAction } from '../controllers/userController';

const router = express.Router();

// GET POST
router.route('/')
    .get(readUsersAction)
    .post(createUserAction);

// GET PUT DELETE     
router.route('/:id')
    .get(readUserAction)
    .put(updateUserAction)
    .delete(deleteUserAction);

export default router;