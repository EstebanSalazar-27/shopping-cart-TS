import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { FormLogin } from '../components/FormLogin'
import { FormSignIn } from '../components/FormSignIn'

export const Auth = () => {
    const [searchParams] = useSearchParams()
    const requestedForm = searchParams.get('request')
    console.log(requestedForm)
    console.log(searchParams)
    return (
        <div>
            {
                requestedForm === "signin"
                    ?
                    <FormSignIn />
                    :
                    <FormLogin />
            }

        </div>
    )
}
