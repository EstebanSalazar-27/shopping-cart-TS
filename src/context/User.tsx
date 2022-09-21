import { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { sendProductsToUserCart } from "../services/userFunctions";
type ContextValues = {
    user: User,
    setUser: (user: User) => any
}
const UserContext = createContext<ContextValues | undefined>(undefined)
export const USER_INITIAL_VALUE = {
    username: "",
    email: "",
    password: '',
    currency: 0,
    id: 0,
    isVerified: false,
    userCart: []
}
export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUserContext should be use within UserContextProvider")
    }
    return context
}
const userInLocal = JSON.parse(localStorage.getItem('user') || '{}')
export default function UserProvider({ children }: any) {
    const [user, setUser] = useState<User>(userInLocal)
    console.log(user)
    useEffect(() => {
        if (user.isVerified) {
            localStorage.setItem('user', JSON.stringify(user) || '{}')
            sendProductsToUserCart(user.id, user.userCart)
        } else {
            setUser(USER_INITIAL_VALUE)
        }
    }, [user])


    return (
        <UserContext.Provider value={{ user: user as ContextValues["user"], setUser }}>
            {children}
        </UserContext.Provider>
    )
}