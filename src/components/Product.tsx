
import { useShoppingContext } from '../context/ShoppingCartContext'
import { Product } from '../models/products'

type ProductProps = {
    product: Product
}
export const SingleProduct = ({ product }: ProductProps) => {
    const { addProductToCart } = useShoppingContext()
    const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbIVbja2uEy1iFqwNHGvmidYVSs4rz2B-Z9A&usqp=CAU"



    return (
        <div className='flex flex-col items-start p-2 bg-stone-800 w-56 gap-4 rounded-sm shadow-md hover:shadow-lg transition-all '>
            <img src='https://www.hogarmania.com/archivos/202010/como-lavar-ropa-de-color-668x400x80xX-1.jpg' className={`h-full min-h-[150px] w-full bg-stone-600 object-cover`}></img>
            <div className='flex w-full justify-between'>
                <h2 className='capitalize font-semiboldp-1 bg-slate-500 text-white rounded-md px-2 hover:bgsky hover:bg-sky-500 transition-colors' >{product.name}</h2>
                <h3 className='font-semibold px-2 bg-slate-500 text-white rounded-md hover:bgsky hover:bg-sky-500 transition-colors'>{product.price}</h3>
            </div>

            <button onClick={() => addProductToCart(product)} className='bg-green-500 rounded-md p-1 text-slate-100 text-sm font-bold w-24 hover:bg-green-600 transition-colors text-center mx-auto'>Add to car</button>
        </div >
    )
}
