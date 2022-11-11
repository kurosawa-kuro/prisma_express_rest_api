import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
};

// Create
export const createUser = async (
    user: Omit<User, "id">
): Promise<User> => {
    const { name, email } = user;
    return db.user.create({
        data: {
            name,
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

// Read
export const readUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

// Read
export const readUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
};

// Update
export const updateUser = async (
    id: number,
    user: Omit<User, "id">
): Promise<User> => {
    const { name, email } = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            name,
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
};

// Delete
export const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        },
    });
};