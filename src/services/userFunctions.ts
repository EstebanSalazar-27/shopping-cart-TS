import { User } from "../models/User"


export async function postNewUser(url: string, data: User) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const getUser = async (username: string) => {
    const response = await fetch(`http://localhost:3000/users?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}
export const getUserData = async (username: string, password: string) => {
    const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}
export const sendProductsToUserCart = (userID: any, productsInCart: any) => {
    fetch(`http://localhost:3000/users/${userID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userCart: productsInCart
        })
    })
}
