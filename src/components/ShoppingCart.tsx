import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from 'react'
import { ShoppingList } from './ShoppingList'
import { useShoppingContext } from '../context/ShoppingCartContext'
import { Product } from '../models/products'

export const ShoppingCart = () => {
    const [expandList, setExpandList] = useState<boolean>(false)
    const { productsInCart, totalBill } = useShoppingContext()


    const expandListInCart = () => {
        setExpandList(prevExpandState => !prevExpandState)
    }

    return (
        <div className='relative'>

            <div className='relative'>
                <span className=' text-sm p-[4px]  bg-orange-500 rounded-full right-6 text-slate-200 absolute '>{productsInCart.length}</span>
                <button className='' onClick={expandListInCart}>
                    <FontAwesomeIcon className='text-slate-700' size={'1x'} icon={faShoppingCart} />
                </button>
            </div>

            <ShoppingList productsInCart={productsInCart} totalBill={totalBill} expandList={expandList} />
        </div>
    )
}
