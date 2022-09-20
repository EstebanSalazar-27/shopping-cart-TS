import { ErrorMessage, Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { USER_INITIAL_VALUE, useUserContext } from '../context/User'
import { User } from '../models/User'
import { getUser, postNewUser } from '../services/userFunctions'
type ErrorForm = {
    username: string,
    password: string,
    confirmPassword: string,
}
export const FormUser = () => {
    const [userData, setUserData] = useState<User>(USER_INITIAL_VALUE)
    const [formFilledOut, setFormFilledOut] = useState<boolean>(false)
    const navigate = useNavigate()
    const { setUser, user } = useUserContext()
    const userForm = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("obligatorio"),
            password: Yup.string().required(),
            confirmPassword: Yup.string().required()
        }),
        validate: (values) => {
            let errors: ErrorForm = {
                username: "",
                password: "",
                confirmPassword: ""
            }
            if (typeof values.username !== "string") {
                errors.username = 'nesecita ser tipo string'
            }
            if (typeof values.password || values.confirmPassword === "string") {
                errors.password = 'this fild only accepts numbers'
                errors.confirmPassword = " this field only accepts numbers"
            }

            return errors
        },
        onSubmit: (userData) => { console.log(userData, 'SUBMIT') }

    })
    async function handleSubmit(e: any) {
        e.preventDefault()
        await setUserData({
            ...userData,
            isVerified: true,
            id: Math.random() * 95
        })
        await setFormFilledOut(true)

    }
    useEffect(() => {
        if (formFilledOut === true) {
            postNewUser("http://localhost:3000/users", userData)
        }
    }, [formFilledOut])
    async function fetchUser() {
        if (userData.username) {
            const res = await getUser(userData.username)
            setUser(res[0])
        }

    }
    useEffect(() => {
        fetchUser()
    }, [formFilledOut])
    useEffect(() => {
        if (user.isVerified) {
            navigate(`/?user=${userData.username}`)
        }
    }, [user])
    return (
        <form onSubmit={userForm.handleSubmit} className='bg-stone-800 p-2 w-full max-w-[400px] py-4  mx-auto my-auto flex flex-col gap-4'>
            <div className='grid gap-2'>
                <input onChange={userForm.handleChange} className='w-full p-1  bg-black/40 text-slate-200' name='username' type="text" value={userForm.values.username} placeholder='Username' />

                {userForm.errors && userForm.touched && <div>{userForm.errors.username} </div>}
                <h2 className='text-white text-lg z-50'></h2>
                <input onChange={userForm.handleChange} className='w-full p-1 bg-black/40 text-slate-200' name='password' type="password" value={userForm.values.password} placeholder='Password' />
                <input onChange={userForm.handleChange} className='w-full p-1 bg-black/40 text-slate-200' name='confirmPassword' type="password" value={userForm.values.confirmPassword} placeholder='Confirm Password' />
            </div>

            <input className='w-full bg-sky-500 py-2 font-bold text-slate-200 hover:bg-sky-600 transition-colors cursor-pointer' type="submit" value="Sign in" />
        </form>
    )
}
