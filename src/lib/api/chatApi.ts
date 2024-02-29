import axios from 'axios'
import { API_ENDPOINTS } from './endpoints'

export namespace ChatApi {
  export async function getMyChats() {
    return await axios.get(API_ENDPOINTS.chat.myChats, { withCredentials: true })
  }

  export async function getChatDetail(chatId: string) {
    return await axios.get(`${API_ENDPOINTS.chat.detail}/${chatId}`, { withCredentials: true })
  }

  type CreateChatParams = {
    name: string
    userIds: string[]
  }

  export async function createChat(params: CreateChatParams) {
    return await axios.post(API_ENDPOINTS.chat.create, params, { withCredentials: true })
  }
}
