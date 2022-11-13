import React, { useState, useEffect } from 'react'
import axios from 'axios';

const User = () => {
    type User = {
        id: number,
        name: string,
        email: string,
    };

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        axios.get('/users')
            .then(res => {
                setUsers(res.data.users)
            })
    }, [])

    return (
        <ul>
            {users && users.map((user) => (
                <li key={user.id}><span>name:{user.name}, email:{user.email}</span></li>
            ))}
        </ul>
    )
}

export default User