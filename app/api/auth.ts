import {BASE_URL} from "app/util/constants";

const login = async (credentials: { id: string; password: string }) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify(credentials)

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
    return await response.json()
}

const getUserByToken = async (token: string) => {
    const myHeaders = new Headers()
    myHeaders.append(
      'x-access-token', token
    )

    const response = await fetch(`${BASE_URL}/users/profile`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    return await response.json()
      
}
    

export const useAuth = () => {
    return {
        login,
        getUserByToken
    }
}

