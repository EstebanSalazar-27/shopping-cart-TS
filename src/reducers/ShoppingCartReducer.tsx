import { useReducer } from "react";
import { Product, ProductList } from "../models/products"

type Products = ProductList
type ReducerState = Products | []
type ReducerReturn = Products | any
export enum ActionsKind {
    ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT",
    INCREMENT_STACK = "INCREMENT-STACK",
}
interface ActionsCart {
    type: ActionsKind;
    payload?: Product;
}

export default function shoppingCartReducer(state: ReducerState, { payload, type }: ActionsCart): ReducerReturn {
    switch (type) {
        case ActionsKind.ADD_NEW_PRODUCT:
            return ([...state, payload])
        case ActionsKind.INCREMENT_STACK:
            return [...state]
        default:
            return console.error(` this action doesn't exists`)
    }
}
