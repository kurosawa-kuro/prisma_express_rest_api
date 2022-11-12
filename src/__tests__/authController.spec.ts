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
            console.log("response.body.user", response.body.user)
            const users = await prisma.user.findMany();
            const registeUser = await prisma.user.findUnique({ where: { email: 'aaaa@email.com' } });

            expect(response.status).toBe(201);
            expect(users.length).toBe(1);
            expect(response.body.user.name).toEqual(registeUser?.name);
            expect(response.body.user.email).toEqual(registeUser?.email);
            expect(response.body.user.token).not.toEqual('');
            expect(typeof response.body.user.token).toBe('string')
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
            expect(response.body.user.token).not.toEqual('');
            expect(typeof response.body.user.token).toBe('string')
        });
    });

    describe("POST /users", () => {
        test("response with success", async () => {
            const body = { name: "user1", email: "user1@example.com" };

            const response = await supertest(app).post("/users").send(body);
            const users = await prisma.user.findMany();

            expect(response.status).toBe(201);
            expect(response.body.user.name).toEqual(body.name);
            expect(response.body.user.email).toEqual(body.email);

            expect(users.length).toBe(1);
        });
    });

    describe("PUT /users/:id", () => {
        test("response with success", async () => {
            await prisma.user.create({ data: { id: 1, name: "user1", email: "user1@example.com", password: '' } });
            const body = { name: "updated", email: "updated@example.com" };

            const response = await supertest(app).put("/users/1").send(body);
            const after = await prisma.user.findUnique({ where: { id: 1 } });

            expect(response.status).toBe(201);
            expect(response.body.user.name).toEqual(body.name);
            expect(response.body.user.email).toEqual(body.email);

            expect(after?.name).toEqual(body.name);
            expect(after?.email).toEqual(body.email);
        });
    });

    describe("DELETE /users/:id", () => {
        test("response with success", async () => {
            const user = await prisma.user.create({ data: { id: 1, name: "user1", email: "user1@example.com", password: '' } });

            const response = await supertest(app).delete("/users/1");
            const users = await prisma.user.findMany();

            expect(response.status).toBe(204);

            expect(users.length).toBe(0);
        });
    });
});
