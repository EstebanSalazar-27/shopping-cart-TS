import React from 'react'
import { ProductList } from '../models/products';

type ShoppingListProps = {
    expandList: boolean;
    productsInCart: ProductList;
    totalBill: number;
}

export const ShoppingList = ({ expandList, productsInCart, totalBill }: ShoppingListProps) => {


    return (
        <div className={`z-50 absolute right-4 top-6 w-60 min-h-[300px] max-h-[300px]  bg-slate-200 rounded-sm shadow-md scale-0 opacity-0 origin-top-right transition-all duration-200 blur-md ${expandList ? "scale-100 opacity-100 blur-0" : ""} overflow-y-auto `} >
            <table className=' w-full p-2'>
                <thead className='bg-sky-500 w-full p-2 h-8'>
                    <tr>
                        <th className='text-slate-100 text-left p-2 text-sm'>Name</th>
                        <th className='text-slate-100 text-left p-2 text-sm'>Amount</th>
                        <th className='text-slate-100 text-left p-2 text-sm'>Price</th>
                    </tr>
                </thead>
                {productsInCart.length > 0 ? productsInCart.map(({ name, cantidad, price, id }) => {
                    return (
                        <tbody className='w-full' key={id}>
                            <tr>
                                <td className='text-slate-700 font-semibold p-2 bg-slate-300 border-b-2 text-sm capitalize'>{name}</td>
                                <td className='text-slate-700 font-semibold p-2 bg-slate-300 border-b-2 text-sm capitalize'>{cantidad}</td>
                                <td className='text-slate-700 font-semibold p-2 bg-slate-300 border-b-2 text-sm capitalize'>{price}</td>
                            </tr>
                            <tr>

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
                        <td className='flex absolute bottom-0 p-2 bg-green-500 w-full text-slate-200 font-bold capitalize' colSpan={12}>TOTAL: ${totalBill}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
