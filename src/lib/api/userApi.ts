import axios from 'axios'
import { API_ENDPOINTS } from './endpoints'

export namespace UserApi {
  export async function getAllUsers() {
    return axios.get(API_ENDPOINTS.user.all)
  }

  export async function getCurrentUser() {
    return axios.get(API_ENDPOINTS.user.current, { withCredentials: true })
  }
}
