import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 600000,
  headers: {
    'AUTH_ID': import.meta.env.VITE_AUTH_ID
  }
})