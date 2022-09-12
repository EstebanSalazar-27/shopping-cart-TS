import React, { useContext } from 'react'
import { ContextStates, ShoppingCartContext, useShoppingContext } from '../context/ShoppingCartContext'
import { Product } from '../models/products'

type ProductProps = {
    product: Product
}
export const SingleProduct = ({ product }: ProductProps) => {
    const { addProductToCart } = useShoppingContext()
    const img = ""
    function addProducto() {
        if (product) {
            addProductToCart(product)
        }

    }
    return (
        <div className='flex flex-col items-start p-2 bg-slate-200 w-56 gap-4 rounded-sm shadow-md hover:shadow-lg transition-all '>
            <img className={`h-40 w-full bg-white object-contain ${img === "" ? "animate-pulse" : ""}`}></img>
            <div className='flex w-full justify-between'>
                <h2 className='capitalize font-semiboldp-1 bg-slate-500 text-white rounded-md px-2 hover:bgsky hover:bg-sky-500 transition-colors' >{product.name}</h2>
                <h3 className='font-semibold px-2 bg-slate-500 text-white rounded-md hover:bgsky hover:bg-sky-500 transition-colors'>{product.price}</h3>
            </div>
            <h3>{product.id}#</h3>
            <button onClick={addProducto} className='bg-green-500 rounded-md p-1 text-slate-100 text-sm font-bold w-24 hover:bg-green-600 transition-colors text-center mx-auto'>Add to car</button>
        </div >
    )
}
