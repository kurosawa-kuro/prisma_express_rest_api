// import * as UserService from "../../service/user";
import * as AuthService from "../../service/auth";

async function main() {
    // userServiceStart()
    authServiceStart()
}

async function userServiceStart() {
    // // C
    // await UserService.createUser({ name: 'aaa', email: 'aaa@aaa.aaa' });

    // // R
    // const user = await UserService.readUsers();
    // console.log({ user })

    // // U
    // const id = user[0].id
    // const updateUser = await UserService.updateUser(id, { name: 'bbb', email: 'bbb@bbb.bbb' });
    // console.log({ updateUser })

    // // D
    // await UserService.deleteUser(id);
}

async function authServiceStart() {
    const random = Math.random()
    const signupedUser = await AuthService.signupUser({ name: 'aaa', email: `${random}@email.com`, password: 'aaa@aaa.aaa' })
    // const signupedUser = await AuthService.signupUser({ name: 'aaa', email: `aaa@email.com`, password: 'aaa@aaa.aaa' })
    console.log({ signupedUser })

    const signinedUser = await AuthService.signinUser({ email: `aaa@email.com`, password: 'aaa@aaa.aaa' })
    console.log({ signinedUser })
}

main()