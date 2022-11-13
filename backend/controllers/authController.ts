import { Request, Response } from "express";

import { registerUserService, loginUserService } from "../services/authService";
import asyncHandler from '../utils/asyncHandler';

// @desc    Create user
// @route   POST /users
// @access  Public
const registerUserAction = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const user = await registerUserService(body);

    return res.status(201).json({ user });
});

// @desc    Read users
// @route   GET /users
// @access  Public
const loginUserAction = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const user = await loginUserService(body);

    return res.status(201).json({ user });
});

export { registerUserAction, loginUserAction };