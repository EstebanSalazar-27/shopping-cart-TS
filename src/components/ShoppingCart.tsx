import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from 'react'
import { ShoppingList } from './ShoppingList'
import { useShoppingContext } from '../context/ShoppingCartContext'
import { Product } from '../models/products'

export const ShoppingCart = () => {
    const [expandList, setExpandList] = useState<boolean>(false)
    const { productsInCart, totalBill, removeProduct } = useShoppingContext()


    const expandListInCart = () => {
        setExpandList(prevExpandState => !prevExpandState)
    }
    const clickOutsideModal = () => {
        setExpandList(false)
    }
    return (
        <div>
            <div
                onClick={clickOutsideModal}
                className={` bg-stone-800/40 transition-all ${expandList ? "block" : "hidden scale-0 "}  fixed w-full h-full left-0 top 0 bottom-0`}>
            </div>
            <div
                className='relative'>
                <div className='relative'>
                    <span className=' text-sm p-[4px]  bg-orange-500 rounded-full right-6 text-slate-200 absolute '>{productsInCart.length}</span>
                    <button className='' onClick={expandListInCart}>
                        <FontAwesomeIcon className='text-slate-200' size={'1x'} icon={faShoppingCart} />
                    </button>
                </div>

                <ShoppingList removeProduct={removeProduct} productsInCart={productsInCart} totalBill={totalBill} expandList={expandList} />
            </div>
        </div>

    )
}
