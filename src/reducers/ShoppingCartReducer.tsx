import { useReducer } from "react";
import { Product, ProductList } from "../models/products"
import { User } from "../models/User";

type Products = ProductList
type ReducerState = Products | []
type ReducerReturn = Products | any
export enum ActionsKind {
    ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT",
    INCREMENT_STACK = "INCREMENT-STACK",
    REMOVE_PRODUCT = "REMOVE_PRODUCT",
    RECOVER_USER_CART = "RECOVER_USER_CART",
    CONFIRM_PAYMENT = "CONFIRM_PAYMENT",
}
interface ActionsCart {
    type: ActionsKind;
    payload?: Product | any;
}

export default function shoppingCartReducer(state: ReducerState, { payload, type }: ActionsCart): ReducerReturn {
    switch (type) {
        case ActionsKind.ADD_NEW_PRODUCT:
            return ([...state, payload])
        case ActionsKind.INCREMENT_STACK:
            return [...state]
        case ActionsKind.REMOVE_PRODUCT:
            return ([...state.filter(product => product.id !== payload?.id)])
        case ActionsKind.RECOVER_USER_CART:
            return ([...state])
        case ActionsKind.CONFIRM_PAYMENT:
            return ([...payload])
        default:
            return console.error(` this action doesn't exists`)
    }
}
