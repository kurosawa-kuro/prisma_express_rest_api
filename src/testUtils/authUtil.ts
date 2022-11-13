import supertest from 'supertest'
import app from '../app'

export type User = {
    name: string;
    email: string;
    password: string;
};

export const register = async (
    user: User
) => {
    await supertest(app).post('/auth/register').send({
        name: user.name,
        email: user.email,
        password: user.password,
    })
}

export const login = async (
    user: Omit<User, "name">
): Promise<string> => {
    console.log({ user })
    const res = await supertest(app).post('/auth/login').send({
        email: user.email,
        password: user.password,
    })

    console.log("res.body", res.body)
    console.log("res.body.user", res.body.user)
    if (!res.body.user?.token) {
        throw new Error("token undefined");
    }

    return res.body.user.token
}
