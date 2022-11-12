import { Router, Request, Response } from "express";
import { db } from "../utils/db";
import { readUsersService } from "../services/userService";
import asyncHandler from '../utils/asyncHandler';

const router = Router();

// @desc    Create user
// @route   POST /users
// @access  Public
// router.post("/", async (req: Request, res: Response) => {
//     const body = req.body;
//     const user = await UserService.createUser(body);

//     return res.status(201).json({ user });
// });

export const readUsersAction = asyncHandler(async (req: Request, res: Response) => {
    const users = await readUsersService();

    return res.status(200).json({ users });
});

// // @desc    Read users
// // @route   GET /users
// // @access  Public
// router.get("/", async (req: Request, res: Response) => {
//     const users = await UserService.readUsers();

//     return res.status(200).json({ users });
// });

// // @desc    Read user
// // @route   GET /users/:id
// // @access  Public
// router.get("/:id", async (req: Request, res: Response) => {
//     const id: number = parseInt(req.params?.id, 10);
//     const user = await UserService.readUser(id);

//     return res.status(200).json({ user });
// });

// // @desc    Update user
// // @route   PUT /user/:id
// // @access  Public
// router.put("/:id", async (req: Request, res: Response) => {
//     const id: number = parseInt(req.params?.id, 10);
//     const body = req.body;
//     const user = await UserService.updateUser(id, body);

//     return res.status(200).json({ user });
// });


// // @desc    Delete user
// // @route   DELETE /users/:id
// // @access  Public
// router.delete("/:id", async (req: Request, res: Response) => {
//     const id: number = parseInt(req.params?.id, 10);
//     await UserService.deleteUser(id);

//     return res.status(204).json("User has been successfully deleted");
// });

export default router