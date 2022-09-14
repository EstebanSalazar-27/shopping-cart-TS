import { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../models/User";

type ContextValues = {
    user: User,
    setUser: (user: User) => any
}
const UserContext = createContext<ContextValues | undefined>(undefined)

export const USER_INITIAL_VALUE = {
    name: "",
    lastName: "",
    currency: undefined,
    id: undefined,
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



    useEffect(() => {
        if (user.isVerified) {
            localStorage.setItem('user', JSON.stringify(user) || '{}')
        }

    }, [user])

    useEffect(() => {
        const getUserCartInLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
        setUser({
            ...user,
            userCart: getUserCartInLocalStorage
        })

    }, [])


    console.log(user)


    return (
        <UserContext.Provider value={{ user: user as ContextValues["user"], setUser }}>
            {children}
        </UserContext.Provider>
    )
}