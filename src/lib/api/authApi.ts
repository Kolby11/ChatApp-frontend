import axios from 'axios'
import { API_ENDPOINTS } from './endpoints'

export namespace AuthApi {
  type RegisterParams = {
    username: string
    email: string
    password: string
    confirmPassword: string
  }

  export async function register(params: RegisterParams) {
    return await axios.post(API_ENDPOINTS.auth.register, params)
  }

  type LoginParams = {
    usernameOrEmail: string
    password: string
  }

  export async function login(params: LoginParams) {
    return await axios.post(API_ENDPOINTS.auth.login, params, { withCredentials: true })
  }

  export async function logout() {
    return await axios.get(API_ENDPOINTS.auth.logout, { withCredentials: true })
  }
}
