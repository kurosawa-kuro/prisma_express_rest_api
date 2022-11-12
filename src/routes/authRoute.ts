import express from 'express';
import { registerUserAction, loginUserAction } from '../controllers/authController';

const router = express.Router();

// POST
router.route('/register')
    .post(registerUserAction);

router.route('/login')
    .post(loginUserAction);

export default router;