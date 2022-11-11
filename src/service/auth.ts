import { db } from "../utils/db";
const bcrypt = require("bcrypt");

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

// Sign up
export const signupUser = async (
    user: Omit<User, "id">
): Promise<Omit<User, "password">> => {
    const { name, email, password } = user;

    const foundUserWithEmail = await db.user.findUnique({
        where: {
            email,
        },
    });
    console.log({ foundUserWithEmail })

    if (foundUserWithEmail) {
        throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log({ hashedPassword })

    return db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
};

// Sign in
export const signinUser = async (
    user: Omit<User, "id" | "name">
): Promise<User> => {
    const { email, password } = user;

    const foundUserWithEmail = await db.user.findUnique({
        where: {
            email,
        },
    });
    console.log({ foundUserWithEmail })

    if (!foundUserWithEmail) {
        throw new Error("user not found");
    }

    const isValidUser = await bcrypt.compare(password, foundUserWithEmail.password)
    console.log({ isValidUser })

    if (!isValidUser) {
        throw new Error("invalid credintial data");
    }

    return foundUserWithEmail
};