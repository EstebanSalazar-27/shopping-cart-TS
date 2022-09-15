import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ProductList, Product } from "../models/products";
import shoppingCartReducer, { ActionsKind } from "../reducers/ShoppingCartReducer";
import { useUserContext } from "./User";
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
const cartInLocalStorage = JSON.parse(localStorage.getItem('cart') || "[]")
export function ShoppingCartProvider({ children }: any) {
    const [productsInCart, dispatch] = React.useReducer(shoppingCartReducer, cartInLocalStorage)
    const Navigate = useNavigate()
    const { user, setUser } = useUserContext()
    let totalBill = 0
    if (productsInCart.length > 0) {
        for (let i = 0; i < productsInCart.length; i++) {
            totalBill = totalBill + productsInCart[i].price * productsInCart[i].cantidad
        }
    }
    const addProductToCart = (newProduct: Product) => {
        if (!user.isVerified) {
            Navigate(`/login/user`)
        } else {
            const isProductAlreadyAdded = productsInCart.findIndex((product: Product) => product.id == newProduct.id || product.name === newProduct.name)
            if (isProductAlreadyAdded === -1) {
                dispatch({ type: ActionsKind.ADD_NEW_PRODUCT, payload: newProduct })
            }
            let incrementedStack = productsInCart[isProductAlreadyAdded].cantidad += 1
            dispatch({ type: ActionsKind.INCREMENT_STACK, payload: incrementedStack })
        }
    }
    const removeProduct: ContextStates["removeProduct"] = (productByRemove: Product) => {
        dispatch({ type: ActionsKind.REMOVE_PRODUCT, payload: productByRemove })
    }
    React.useEffect(() => {
        if (!user.isVerified) {
            localStorage.setItem('cart', JSON.stringify([]))
            setUser({ ...user, userCart: [] })
        }
        localStorage.setItem('cart', JSON.stringify(productsInCart))
    }, [user.isVerified, productsInCart])

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
