import React, { useState, useEffect } from 'react'
import axios from 'axios';


const User = () => {
    type User = {
        id: number,
        name: string,
        email: string,
    };

    const [users, setUsers] = useState<User[]>([])
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        axios.get('/users')
            .then(res => {
                console.log({ res })
                setUsers(res.data.users)
            })
    }, [])

    return (
        <ul>
            <span> users </span>
            {users && users.map((user) => (
                <li key={user.id}><span>name:{user.name}, email:{user.email}</span></li>
            ))}
        </ul>
    )
}

export default User