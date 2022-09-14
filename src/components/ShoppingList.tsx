import React from 'react'
import { Product, ProductList } from '../models/products';

type ShoppingListProps = {
    expandList: boolean;
    productsInCart: ProductList;
    totalBill: number;
    removeProduct: (productByDelete: Product) => void;
}

export const ShoppingList = ({ expandList, productsInCart, totalBill, removeProduct }: ShoppingListProps) => {
    return (
        <div
            className={`
        z-50 absolute 
        right-4 top-6 w-60 min-h-[300px] max-h-[300px] min-w-[300px]
         bg-stone-900 rounded-sm shadow-md scale-0 opacity-0 
         origin-top-right 
         transition-all duration-200 blur-md ${expandList ? "scale-100 opacity-100 blur-0" : ""} overflow-y-auto `} >
            <table className=' w-full p-2'>
                <thead className='bg-stone-800 w-full p-2 h-8  min-w-full'>
                    <tr >
                        <th className='text-slate-100 text-left p-2 text-sm'>Name</th>
                        <th className='text-slate-100 text-left p-2 text-sm'>Amount</th>
                        <th colSpan={2} className='text-slate-100 text-left p-2 text-sm'>Price</th>
                    </tr>
                </thead>
                {productsInCart.length > 0 ? productsInCart.map((product) => {
                    return (
                        <tbody className='w-full' key={product.id}>
                            <tr>
                                <td className='text-slate-200 font-semibold p-2   text-sm capitalize'>{product.name}</td>
                                <td className='text-slate-200 font-semibold p-2 text-sm capitalize'>{product.cantidad}</td>
                                <td className='text-slate-200 font-semibold p-2   text-sm capitalize'>{product.price}</td>
                                <td onClick={() => removeProduct(product)} className='text-orange-500 cursor-pointer font-semibold p-2   text-sm capitalize '  >Remove</td>
                            </tr>

                        </tbody>
                    )
                })
                    :
                    <tbody>
                        <tr>
                            <td className='text-orange-500 font-semibold  text-md mx-auto'>Cart is empty</td>
                        </tr>

                    </tbody>

                }
                <tbody>
                    <tr>
                        <td className='flex  absolute top-0  p-2 bg-green-500  w-full text-slate-200 font-bold capitalize' colSpan={12}>TOTAL: ${totalBill}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
