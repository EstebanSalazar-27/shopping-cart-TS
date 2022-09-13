import * as React from "react"
import { ProductList, Product } from "../models/products";
import shoppingCartReducer, { ActionsKind } from "../reducers/ShoppingCartReducer";

export const initialState: ProductList = []
export type ContextStates = {
    productsInCart: ProductList;
    addProductToCart: (newProduct: Product) => any;
    totalBill: number;
    removeProduct: (productByRemove: Product) => void
}
type ContextValues = {
    productsInCart: ContextStates["productsInCart"];
    addProductToCart: ContextStates["addProductToCart"];
    totalBill: ContextStates["totalBill"],
    removeProduct: ContextStates["removeProduct"]
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
    const removeProduct: ContextStates["removeProduct"] = (productByRemove: Product) => {
        let productsRemaining = productsInCart.filter((product: Product) => product.id !== productByRemove.id)

        dispatch({ type: ActionsKind.REMOVE_PRODUCT, payload: productByRemove })
    }


    return (
        <ShoppingCartContext.Provider value={{
            removeProduct: removeProduct as ContextStates["removeProduct"],
            addProductToCart: addProductToCart as ContextStates["addProductToCart"],
            productsInCart: productsInCart as ContextStates["productsInCart"],
            totalBill: totalBill as ContextStates["totalBill"],

        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
