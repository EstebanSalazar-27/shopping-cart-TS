import { isEmptyArray } from "formik";
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
    removeProduct: (productByRemove: Product) => void;
    confirmPurchase: () => void;
    handlePurchaseProcess: { isError: boolean, errorMsg: string, paymentFinished?: boolean, loading?: boolean | null }
}
type ContextValues = {
    productsInCart: ContextStates["productsInCart"];
    addProductToCart: ContextStates["addProductToCart"];
    totalBill: ContextStates["totalBill"],
    removeProduct: ContextStates["removeProduct"]
    confirmPurchase: ContextStates["confirmPurchase"]
    handlePurchaseProcess: ContextStates["handlePurchaseProcess"]
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
    const [handlePurchaseProcess, setHandlePurchaseProcess] = React.useState<ContextStates["handlePurchaseProcess"]>({
        isError: false,
        errorMsg: "",
        paymentFinished: false,
        loading: false,
    })
    console.log(handlePurchaseProcess)
    const Navigate = useNavigate()
    const { user, setUser } = useUserContext()
    let totalBill = 0
    if (productsInCart.length > 0) {
        for (let i = 0; i < productsInCart.length; i++) {
            totalBill = totalBill + productsInCart[i].price * productsInCart[i].cantidad
        }
    }
    const confirmPurchase = () => {
        if (user.currency < totalBill) {
            setHandlePurchaseProcess({
                isError: true,
                errorMsg: "user doesn't have enough  funds to perfom this actions, please try doing funds recharges",

            })
        } else if (productsInCart.length < 1) {
            setHandlePurchaseProcess({
                isError: true,
                errorMsg: 'the cart is empty please try put in it some products'
            })
        } else {

            setHandlePurchaseProcess({
                isError: false,
                errorMsg: "",
                loading: true,
                paymentFinished: false
            })

            setUser({
                ...user,
                currency: user.currency - totalBill
            })
            setTimeout(() => {
                setHandlePurchaseProcess({
                    ...handlePurchaseProcess,
                    loading: false,
                    paymentFinished: true
                })
            }, 2000);
            dispatch({ type: ActionsKind.CONFIRM_PAYMENT, payload: [] })
            console.log('compra exitosa')
        }
    }
    const addProductToCart = (newProduct: Product) => {
        if (!user.isVerified) {
            Navigate(`/auth/user?request=signin`)
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
            confirmPurchase: confirmPurchase as ContextStates["confirmPurchase"],
            handlePurchaseProcess: handlePurchaseProcess as ContextStates["handlePurchaseProcess"],
            productsInCart: productsInCart as ContextStates["productsInCart"],
            totalBill: totalBill as ContextStates["totalBill"],
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
