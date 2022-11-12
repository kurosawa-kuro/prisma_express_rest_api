import express from 'express';
import { index } from '../controllers/userController';

const router = express.Router();

// GET POST
router.route('/').get(index);


export default router;