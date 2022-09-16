import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import * as React from 'react'
import { ShoppingCart } from './ShoppingCart'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/User'

export const Navbar = () => {
    const { user, setUser } = useUserContext()
    const [showUserData, setShowUserData] = React.useState(false)
    return (
        <nav className='w-full h-10 px-4 mb-10 bg-stone-800  shadow-lg flex items-center justify-between'>
            <Link to={'/'} className='text-lg font-bold text-slate-200'>Ecommerce</Link>
            <div
                onClick={() => setShowUserData(!showUserData)}
                className={` bg-stone-800/40 transition-all ${showUserData ? "block" : "hidden scale-0 "}  fixed w-full h-full left-0 top 0 bottom-0`}>
            </div>
            <div className='flex gap-4 items-center relative'>
                <ShoppingCart />

                <button onClick={() => setShowUserData(!showUserData)}><FontAwesomeIcon color='#ccc' fontSize={18} icon={faCircleUser} /></button>
                <h4 className='font-bold text-slate-100'>${user.currency}</h4>
                <div className={`flex flex-col bg-stone-800 transition-transform origin-top-right items-start p-2 w-48 gap-2 absolute top-10 right-0 scale-0 ${showUserData ? "scale-100" : ""}`}>
                    <h2 className='text-slate-200 text-sm  capitalize'>name: {user.name}</h2>
                    <h2 className='text-slate-200 text-sm  capitalize'>lastname: {user.lastName}</h2>
                    <h4 className='text-slate-200 text-sm capitalize'>id: #{user.id}</h4>

                </div>

            </div>

        </nav>
    )
}
