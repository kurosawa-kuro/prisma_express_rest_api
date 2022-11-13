import supertest from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../app";
import resetDatabase from "../utils/resetDatabase";
import { setgroups } from "process";

const prisma = new PrismaClient();

describe("authController test", () => {
    beforeEach(async () => {
        await resetDatabase();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("POST /auth/register", () => {
        test("response with success", async () => {
            // setup
            const registerUser = {
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa'
            }
            const registeredUser = await supertest(app).post("/auth/register").send(registerUser);
            const users = await prisma.user.findMany();

            expect(registeredUser.status).toBe(201);
            expect(users.length).toBe(1);
            expect(registeredUser.body.user.name).toEqual(registerUser.name);
            expect(registeredUser.body.user.email).toEqual(registerUser.email);
            expect(registeredUser.body.user.token).toBeDefined()
        });
    });

    describe("POST /auth/login", () => {
        test("response with success", async () => {
            // setup
            const registerUser = {
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa'
            }
            await supertest(app).post("/auth/register").send(registerUser);

            const loginUser = {
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa'
            }

            const loginedUser = await supertest(app).post("/auth/login").send({
                email: 'aaaa@email.com',
                password: 'aaaa',
            });

            expect(loginedUser.status).toBe(201);
            expect(loginedUser.body.user.name).toEqual(loginUser.name);
            expect(loginedUser.body.user.email).toEqual(loginUser.email);
            expect(loginedUser.body.user.token).toBeDefined()
        });
    });
});
