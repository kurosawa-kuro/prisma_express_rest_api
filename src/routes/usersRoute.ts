import express from 'express';
import { readUsersAction } from '../controllers/userController';

const router = express.Router();

router.route('/').get(readUsersAction);

export default router;