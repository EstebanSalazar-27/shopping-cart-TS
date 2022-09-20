import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/User'
import { User } from '../models/User'
import { getUserData } from '../services/userFunctions'
import { ErrorMsg } from './ErrorMsg'
import { InputField } from './FormFields'

type InitialTypes = {
  username: string,
  password: string,
}
export const FormLogin = () => {
  const [userAccoundFound, setUserAccoundFound] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setUser, user } = useUserContext()
  const userLoginForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values: InitialTypes) => validate(values),
    onSubmit: (dataUser) => handleSubmit(dataUser)
  })

  async function handleSubmit(dataUser: InitialTypes) {
    const userAccount = await getUserData(dataUser.username, dataUser.password).then(user => user[0])
    console.log(user, 'from submit')
    setUserAccoundFound(true)
    setUser(userAccount)
    setTimeout(() => {
      navigate('/')
    }, 1500);
  }
  async function validate(values: InitialTypes) {
    let errors = {
      username: "",
      password: "",
    }
    const userExists = await getUserData(values.username, values.password).then(user => user[0])

    if (userExists === undefined) {
      errors.username = " Sorry the typed  username or password  doesn't correpond to one existing account  "
      return errors
    }


  }
  return (
    <>
      <form onSubmit={userLoginForm.handleSubmit} className='bg-stone-800 shadow-md p-2 w-full min-h-[280px] max-w-[400px] py-4  mx-auto my-auto flex flex-col gap-4  '>
        <div className='grid gap-4'>
          <h3 className='text-slate-200 text-lg font-bold'>Login</h3>
          <InputField name='username' onChange={userLoginForm.handleChange} placeholder='Username' type='text' value={userLoginForm.values.username} />
          <InputField name='password' onChange={userLoginForm.handleChange} placeholder='Password' type='password' value={userLoginForm.values.password} />

        </div>
        {
          userLoginForm.errors.username
          &&
          <ErrorMsg msg={userLoginForm.errors.username} />
        }

        <input className='w-full bg-sky-500 py-2 font-bold text-slate-200 hover:bg-sky-600 transition-colors cursor-pointer' type="submit" value="Log in" />
        <div className='flex items-center gap-2 '>
          <h2 className='text-slate-100 text-sm font-semibold duration-200 '> Don't you have an account ? </h2>
          <Link className=' text-md font-semibold text-sky-500 hover:text-sky-600 duration-200' to={'?request=signin'} >Sing in</Link>
        </div>
      </form>
    </>

  )
}
