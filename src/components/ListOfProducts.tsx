import React, { useState } from 'react'
import { ProductList } from '../models/products';
import { SingleProduct } from './Product';

const INITIAL_PRODUCTS = [{
    name: "shirt",
    id: Math.random(),
    cantidad: 1,
    price: 400
},
{
    name: "pants",
    id: Math.random(),
    cantidad: 1,
    price: 1220
},
{
    name: "shoes",
    id: Math.random(),
    cantidad: 1,
    price: 220
}, {
    name: "jacket",
    id: Math.random(),
    cantidad: 1,
    price: 250
}
    , {
    name: "bang",
    id: Math.random(),
    cantidad: 1,
    price: 270
},
{
    name: "stockings",
    id: Math.random(),
    cantidad: 1,
    price: 250
}
    , {
    name: "tights",
    id: Math.random(),
    cantidad: 1,
    price: 270
},
{
    name: "hose",
    id: Math.random(),
    cantidad: 1,
    price: 250
}
    , {
    name: "chain",
    id: Math.random(),
    cantidad: 1,
    price: 270
},
]
export const ListOfProducts = () => {
    const [products, setProducts] = useState<ProductList>(INITIAL_PRODUCTS)
    return (
        <div className=' w-full flex justify-center gap-2   flex-wrap '>
            {products.map((product) => <SingleProduct key={product.id} product={product} />)}
        </div>
    )
}
