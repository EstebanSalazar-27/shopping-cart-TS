import * as React from 'react'
import { ShoppingCart } from './ShoppingCart'

export const Navbar = () => {
    return (
        <nav className='w-full h-10 px-4 mb-10 bg-stone-800  shadow-lg flex items-center justify-between'>
            <h1 className='text-lg font-bold text-slate-200'>Ecommerce</h1>
            <ShoppingCart />

        </nav>
    )
}
