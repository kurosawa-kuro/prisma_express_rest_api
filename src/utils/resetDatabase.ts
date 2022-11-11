import { spawn } from "child_process";
import { PrismaClient } from "@prisma/client";

export default async function () {
    // if (process.env.NODE_ENV === "test") {
    await new Promise(async (resolve, reject) => {
        console.log("invoked resetDatabase")

        try {
            const prisma = new PrismaClient();
            await prisma.user.deleteMany();

            resolve(0);
        } catch (error) {
            reject(0);
        }


        // child.on("close", (code) => {

        //     if (code === 0) {
        //         resolve(0);
        //     } else {
        //         reject(code);
        //     }
        // });
    });
    // }
}
