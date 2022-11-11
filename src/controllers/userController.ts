import { Router, Request, Response } from "express";

import * as UserService from "../service/user";

const router = Router();

// GET /users
router.get("/", async (req: Request, res: Response) => {
    const users = await UserService.readUsers();

    return res.status(200).json({ users });
});

// GET /users/:id
router.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    const user = await UserService.readUser(id);

    return res.status(200).json({ user });
});

// // POST /users
router.post("/", async (req: Request, res: Response) => {
    const body = req.body;
    const user = await UserService.createUser(body);

    return res.status(201).json({ user });
});

// PUT /users/:id
router.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    const body = req.body;
    const user = await UserService.updateUser(id, body);

    return res.status(200).json({ user });
});


// DELETE /users/:id
router.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params?.id, 10);
    await UserService.deleteUser(id);

    return res.status(204).json("User has been successfully deleted");
});

export default router