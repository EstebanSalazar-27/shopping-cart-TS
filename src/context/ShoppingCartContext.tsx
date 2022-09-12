import * as React from "react"
import { ProductList, Product } from "../models/products";
import shoppingCartReducer, { ActionsKind } from "../reducers/ShoppingCartReducer";

export const initialState: ProductList = []
export type ContextStates = {
    productsInCart: ProductList;
    addProductToCart: (newProduct: Product) => any;
    totalBill: number;
}
type ContextValues = {
    productsInCart: ContextStates["productsInCart"];
    addProductToCart: ContextStates["addProductToCart"];
    totalBill: ContextStates["totalBill"]
}

export const ShoppingCartContext = React.createContext<ContextValues | undefined>(undefined)
// Use context Validation
export const useShoppingContext = () => {
    const context = React.useContext(ShoppingCartContext)
    if (context === undefined) {
        throw new Error("useShoppingContext should be use within ShoppingCartProvider")
    }
    return context
}

export function ShoppingCartProvider({ children }: any) {
    const [productsInCart, dispatch] = React.useReducer(shoppingCartReducer, initialState)
    let totalBill = 0

    if (productsInCart.length > 0) {
        for (let i = 0; i < productsInCart.length; i++) {
            totalBill = totalBill + productsInCart[i].price * productsInCart[i].cantidad
        }
    }

    const addProductToCart = (newProduct: Product) => {
        const isProductAlreadyAdded = productsInCart.findIndex((product: Product) => product.id == newProduct.id)
        if (isProductAlreadyAdded === -1) {
            dispatch({ type: ActionsKind.ADD_NEW_PRODUCT, payload: newProduct })
        } else {
            let incrementedStack = productsInCart[isProductAlreadyAdded].cantidad += 1
            dispatch({ type: ActionsKind.INCREMENT_STACK, payload: incrementedStack })
        }
    }
    
    return (
        <ShoppingCartContext.Provider value={{
            productsInCart: productsInCart as ContextStates["productsInCart"],
            addProductToCart: addProductToCart as ContextStates["addProductToCart"],
            totalBill: totalBill as ContextStates["totalBill"]
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
