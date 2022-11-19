import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    fetchAsyncGetUsers, selectUsers
} from "../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';

const User = () => {
    const dispatch: AppDispatch = useDispatch();
    const users: User[] = useSelector(selectUsers);

    type User = {
        id: number,
        name: string,
        email: string,
    };

    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const fetchBootLoader = async () => {
            const result = await dispatch(fetchAsyncGetUsers());
            if (fetchAsyncGetUsers.rejected.match(result)) {
                setSuccessMsg("Get error!");
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <>
            <h2>Users</h2>
            <ul>
                {users && users.map((user) => (
                    <li key={user.id}><span>name:{user.name}, email:{user.email}</span></li>
                ))}
            </ul>
        </>
    )
}

export default User