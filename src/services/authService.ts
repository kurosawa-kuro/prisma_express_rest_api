import bcrypt from "bcrypt";
import { db } from "../utils/db";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

const registerUserService = async (
    user: Omit<User, "id">
): Promise<Omit<User, "id" | "password">> => {
    const { name, email, password } = user;

    // 既存ユーザーチェック Email
    const foundUserWithEmail = await db.user.findUnique({
        where: {
            email,
        },
    })

    if (foundUserWithEmail) {
        throw new Error('user already exists');
    }
    // PW暗号化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 登録
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
        },
    });
};

const loginUserService = async (
    user: Omit<User, "id" | "name">
): Promise<Omit<User, "password"> | undefined> => {
    const { email, password } = user;

    const foundUserWithEmail = await db.user.findUnique({
        where: { email },
    })

    if (!foundUserWithEmail) {
        throw new Error("user not found");
    }

    const isValidUser = await bcrypt.compare(password, foundUserWithEmail.password)

    if (!isValidUser) {
        throw new Error("invalid credintial data");
    }

    return {
        id: foundUserWithEmail.id,
        name: foundUserWithEmail.name,
        email: foundUserWithEmail.email
    } as Omit<User, "password">
};


export { registerUserService, loginUserService };