const BASE_API_URL = 'http://localhost:3000/api/v1'

export const API_ENDPOINTS = {
  auth: {
    register: `${BASE_API_URL}/auth/register`,
    login: `${BASE_API_URL}/auth/login`,
    logout: `${BASE_API_URL}/auth/logout`,
  },
  groupchat: {
    create: `${BASE_API_URL}/groupchat/create`,
    get: `${BASE_API_URL}/groupchat/get`,
    join: `${BASE_API_URL}/groupchat/join`,
    leave: `${BASE_API_URL}/groupchat/leave`,
  },
}
