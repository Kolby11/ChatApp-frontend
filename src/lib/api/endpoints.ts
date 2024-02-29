const BASE_API_URL = 'http://localhost:3000/api/v1'

export const API_ENDPOINTS = {
  auth: {
    register: `${BASE_API_URL}/auth/register`,
    login: `${BASE_API_URL}/auth/login`,
    logout: `${BASE_API_URL}/auth/logout`,
  },
  chat: {
    myChats: `${BASE_API_URL}/chat/myChats`,
    detail: `${BASE_API_URL}/chat`,
    create: `${BASE_API_URL}/chat`,
    leave: `${BASE_API_URL}/chat/leave`,
  },
  user: {
    all: `${BASE_API_URL}/user`,
    current: `${BASE_API_URL}/user/currentUser`,
  },
}
