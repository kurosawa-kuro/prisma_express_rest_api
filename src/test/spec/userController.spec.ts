import supertest from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../../app";
import resetDatabase from "../../utils/resetDatabase";

const prisma = new PrismaClient();

describe("userController test", () => {
    beforeEach(async () => {
        await resetDatabase();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("GET /users", () => {
        test("response with success", async () => {
            for (let i = 1; i < 5; i++) {
                await prisma.user.create({ data: { id: i, name: `user${i}`, email: `user${i}@example.com`, password: 'aaaaaaaaaa' } });
            }
            const users = await prisma.user.findMany();
            const usersWithoutPassWord = users.map((user: any) => {
                delete user.password

                return user
            });

            const response = await supertest(app).get("/users");
            console.log({ response })

            expect(response.status).toBe(200);
            expect(response.body.users).toEqual(usersWithoutPassWord);
        });
    });

    describe("GET /users/:id", () => {
        test("response with success", async () => {
            const user = await prisma.user.create({ data: { id: 1, name: "user1", email: "user1@example.com", password: '' } });
            const response = await supertest(app).get("/users/1");

            expect(response.status).toBe(200);
            expect(response.body.user).toEqual(user);
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

            expect(response.status).toBe(200);
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