import { Request, Response } from "express";

import { User, createUserService, readUsersService, readUserService, updateUserService, deleteUserService } from "../services/userService";
import asyncHandler from '../utils/asyncHandler';

// @desc    Create user
// @route   POST /users
// @access  Public
const registerUserAction = asyncHandler(async (req: Request, res: Response) => {
    const body: User = req.body;
    const user = await createUserService(body);

    return res.status(201).json({ user });
});

// @desc    Read users
// @route   GET /users
// @access  Public
const loginUserAction = asyncHandler(async (req: Request, res: Response) => {
    const body: User = req.body;
    const user = await createUserService(body);

    return res.status(201).json({ user });
});

export { registerUserAction, loginUserAction };