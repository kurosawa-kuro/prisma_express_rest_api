import * as UserService from "../../service/user";


async function main() {
    // C
    await UserService.createUser({ name: 'aaa', email: 'aaa@aaa.aaa' });

    // R
    const user = await UserService.readUsers();
    console.log({ user })

    // U
    const id = user[0].id
    const updateUser = await UserService.updateUser(id, { name: 'bbb', email: 'bbb@bbb.bbb' });
    console.log({ updateUser })

    // D
    await UserService.deleteUser(id);
}

main()