import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_INITIAL_VALUE, useUserContext } from '../context/User'
import { User } from '../models/User'
export const FormUser = () => {
    const [userData, setUserData] = useState<User>(USER_INITIAL_VALUE)
    const navigate = useNavigate()
    const { setUser, user } = useUserContext()
    const [formFillOut, setFormFillOut] = useState<boolean>(false)
    function handleChange(e: any) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e: any) {
        e.preventDefault()
        await setUserData({
            ...userData,
            isVerified: true,
            id: Math.random() * 2
        })
        await setFormFillOut(true)

    }
    useEffect(() => {
        setUser(userData)
    }, [formFillOut])
    useEffect(() => {
        if (user.isVerified) {
            localStorage.setItem("user", JSON.stringify(user))
        }
    }, [])
    useEffect(() => {
        if (user.isVerified) {
            navigate('/')
        }
    }, [user])
    return (
        <form onSubmit={handleSubmit} className='bg-stone-800 p-2 w-full max-w-[400px] py-4  mx-auto my-auto flex flex-col gap-4'>
            <div className='grid gap-2'>
                <input onChange={handleChange} className='w-full p-1  bg-black/40 text-slate-200' name='name' type="text" placeholder='Name' />
                <input onChange={handleChange} className='w-full p-1 bg-black/40 text-slate-200' name='lastName' type="text" placeholder='Lastname' />

            </div>

            <input className='w-full bg-sky-500 py-2 font-bold text-slate-200 hover:bg-sky-600 transition-colors cursor-pointer' type="submit" value="Sign in" />
        </form>
    )
}
