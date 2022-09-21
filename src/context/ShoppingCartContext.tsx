import { isEmptyArray } from "formik";
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ProductList, Product } from "../models/products";
import shoppingCartReducer, { ActionsKind } from "../reducers/ShoppingCartReducer";
import { getUser, sendProductsToUserCart } from "../services/userFunctions";
import { USER_INITIAL_VALUE, useUserContext } from "./User";
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
export function ShoppingCartProvider({ children }: any) {
    const [productsInCart, dispatch] = React.useReducer(shoppingCartReducer, [])
    const [handlePurchaseProcess, setHandlePurchaseProcess] = React.useState<ContextStates["handlePurchaseProcess"]>({
        isError: false,
        errorMsg: "",
        paymentFinished: false,
        loading: false,
    })
    const Navigate = useNavigate()
    const { user, setUser } = useUserContext()
    let totalBill = 0
    if (productsInCart.length > 0) {
        for (let i = 0; i < productsInCart.length; i++) {
            totalBill = totalBill + productsInCart[i].price * productsInCart[i].cantidad
        }
    }
    console.log(productsInCart, 'carrito')
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
        }
    }
    const addProductToCart = async (newProduct: Product) => {
        if (!user.isVerified) {
            Navigate(`/auth/user?request=signin`)
        } else {
            const isProductAlreadyAdded = productsInCart.findIndex((product: Product) => product.id == newProduct.id || product.name === newProduct.name)
            if (isProductAlreadyAdded === -1) {
                dispatch({ type: ActionsKind.ADD_NEW_PRODUCT, payload: newProduct })
            } else {
                let incrementedStack = productsInCart[isProductAlreadyAdded].cantidad += 1
                dispatch({ type: ActionsKind.INCREMENT_STACK, payload: incrementedStack })
            }
        }
    }

    const removeProduct: ContextStates["removeProduct"] = (productByRemove: Product) => {
        dispatch({ type: ActionsKind.REMOVE_PRODUCT, payload: productByRemove })
    }
    React.useEffect(() => {
        if (user.isVerified) {
            const fetchUser = async () => {
                dispatch({ type: ActionsKind.RECOVER_USER_CART, payload: user.userCart })
                console.log('verified')
            }
            fetchUser()
        } else {
            dispatch({ type: ActionsKind.RECOVER_USER_CART, payload: [] })
            localStorage.removeItem('user')
        }

    }, [user.isVerified])
    React.useEffect(() => {
        if (!user.isVerified) {
            setUser(USER_INITIAL_VALUE)
        } else {
            setUser({
                ...user,
                userCart: productsInCart
            })
        }


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
