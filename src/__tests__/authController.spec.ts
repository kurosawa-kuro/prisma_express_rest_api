import supertest from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../app";
import resetDatabase from "../utils/resetDatabase";

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
            const response = await supertest(app).post("/auth/register").send({
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa',
            });

            const users = await prisma.user.findMany();
            const registeUser = await prisma.user.findUnique({ where: { email: 'aaaa@email.com' } });

            expect(response.status).toBe(201);
            expect(users.length).toBe(1);
            expect(response.body.user.name).toEqual(registeUser?.name);
            expect(response.body.user.email).toEqual(registeUser?.email);
            expect(response.body.user.token).toBeDefined()
        });
    });

    describe("POST /auth/login", () => {
        test("response with success", async () => {
            await supertest(app).post("/auth/register").send({
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa',
            });

            const response = await supertest(app).post("/auth/login").send({
                name: 'aaaa',
                email: 'aaaa@email.com',
                password: 'aaaa',
            });

            const users = await prisma.user.findMany();
            const loginUser = await prisma.user.findUnique({ where: { email: 'aaaa@email.com' } });

            expect(response.status).toBe(201);
            expect(users.length).toBe(1);
            expect(response.body.user.name).toEqual(loginUser?.name);
            expect(response.body.user.email).toEqual(loginUser?.email);
            expect(response.body.user.token).toBeDefined()
        });
    });
});
