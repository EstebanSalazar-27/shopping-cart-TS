import React, { useEffect, useState } from 'react'
import JSConfetti from 'js-confetti'
//Yup - Formik
import * as Yup from "yup"
import { useFormik } from 'formik'
// React Router
import { Link, useNavigate } from 'react-router-dom'
//Context
import { USER_INITIAL_VALUE, useUserContext } from '../context/User'
// Components
import { getUser, postNewUser } from '../services/userFunctions'
import { InputField } from './FormFields'
import { ErrorMsg } from './ErrorMsg'


export const FormSignIn = () => {
    const [formFilledOut, setFormFilledOut] = useState<boolean>(false)
    const jsConfetti = new JSConfetti()
    const navigate = useNavigate()
    const userForm = useFormik({
        initialValues: {
            ...USER_INITIAL_VALUE
        },
        validationSchema: Yup.object({
            username: Yup.string().required("obligatorio"),
            password: Yup.string().required(),
            email: Yup.string().email("format is not email type").required()
        }),
        validate: (values) => fieldsValidation(values)
        ,
        onSubmit: (userData) => handleSubmit(userData)

    })
    async function fieldsValidation(values: any) {
        let errors: any = {}
        let userRegistered = await getUser(values.username) ?? undefined

        if (values.password.length < 8) {
            errors.password = "The password most have a min length of 8"
        }
        if (!/^[a-zA-Z]*$/g.test(values.username)) {
            errors.username = "this field only accepts letters "
        }
        if (userRegistered.length > 0) {
            errors.username = 'this username is in use, please try with another one'
        }
        return errors
    }
    async function handleSubmit(userData: any) {
        userData.isVerified = true
        userForm.values.id = Math.random() * 95.5
        await setFormFilledOut(true)
        jsConfetti.addConfetti()
        setTimeout(() => {
            navigate('?request=login')
        }, 4200);
    }
    useEffect(() => {
        if (formFilledOut === true) {
            postNewUser("http://localhost:3000/users", userForm.values)
        }
    }, [formFilledOut])

    return (
        <form onSubmit={userForm.handleSubmit} className='bg-stone-800 shadow-md p-2 w-full max-w-[400px] py-4  mx-auto my-auto flex flex-col gap-4 relative'>
            <div className={`bg-green-500  p-2 w-full transition-all  duration-700 rounded-md  ${formFilledOut ? "translate-y-0 relative " : "-translate-y-48 absolute"}`}>
                <h3 className='text-slate-200 font-bold text-sm'>You have Registered  successfully grats!, now  you will be redirected to the login section :)</h3>
            </div>
            <div className='grid gap-4'>
                <h3 className='text-slate-200 text-lg font-bold'>Sign in new user</h3>
                <InputField name='email' onChange={userForm.handleChange} placeholder='Email' type='email' value={userForm.values.email} />
                {userForm.errors.email && <ErrorMsg msg={userForm.errors.email} />}
                <InputField name='username' onChange={userForm.handleChange} placeholder='Username' type='text' value={userForm.values.username} />
                {userForm.errors.username && <ErrorMsg msg={userForm.errors.username} />}
                <InputField name='password' onChange={userForm.handleChange} placeholder='Password' type='password' value={userForm.values.password} />
                {userForm.errors.password && <ErrorMsg msg={userForm.errors.password} />}
            </div>
            <input className={`w-full bg-sky-500 py-2 font-bold text-slate-200 hover:bg-sky-600 transition-colors cursor-pointer ${formFilledOut ? "bg-slate-500 hover:bg-slate-500" : ''}`} type="submit" disabled={formFilledOut} value={`  ${formFilledOut ? "Redirecting..." : " Sign in"}`} />
            <div className='flex items-center gap-2 '>
                <h2 className='text-slate-100 text-sm font-semibold duration-200 '>Have an account already ? </h2>
                <Link className=' text-md font-semibold text-sky-500 hover:text-sky-600 duration-200' to={'?request=login'} >
                    Log in
                </Link>
            </div>
        </form>
    )
}
