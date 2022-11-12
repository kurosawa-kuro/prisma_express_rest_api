import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

export const readUsersService = async (): Promise<Omit<User, "password">[]> => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        },
    });
};

export const readUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
};

export const createUser = async (
    user: Omit<User, "id">
): Promise<User> => {
    const { name, email, password } = user;
    return db.user.create({
        data: {
            name,
            email,
            password: password || "",
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });
};

export const updateUser = async (
    id: number,
    user: Omit<User, "id">

): Promise<Omit<User, "password">> => {
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

export const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        },
    });
};


