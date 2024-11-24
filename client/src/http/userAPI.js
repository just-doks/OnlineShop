import UserStore from "../store/UserStore";
import {$authHost, $host} from "./index";
import {jwtDecode} from 'jwt-decode';

export const registration = async (email, password) => {
    //const response = await $host.post('api/user/registration', {email, password})
    const {data} = await $host.post('api/users/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/users/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/users/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

    // try {
    //     const {data} = await $authHost.get('api/user/auth')
    //     if  (data) {
    //         localStorage.setItem('token', data.token)
    //         return jwtDecode(data.token)
    //     }
    // } catch (e) {
    //     console.log(e.message)
    // }
    // return {}
}