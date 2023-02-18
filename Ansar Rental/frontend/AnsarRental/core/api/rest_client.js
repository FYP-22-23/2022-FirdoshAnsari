import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios'


const api = axios.create({
  baseURL: 'http://192.168.1.13:8000',
  validateStatus: (code) => code < 500,
})

api.defaults.withCredentials = true
api.defaults.xsrfHeaderName = "X-CSRFToken";
api.defaults.xsrfCookieName = "csrftoken";


export async function login({ email, password }) {
  await logout()
  const res = await api.post('/auth/login-tenant/', { email, password })
  if (res.data.status !== 'error') {
    const user = res.data.user
    await AsyncStorage.setItem('current_user_key', JSON.stringify(user))
    return user
  }
  throw new AxiosError(res.data.message)
}

export async function getLoggedInUser() {
  const res = await AsyncStorage.getItem('current_user_key')
  return JSON.parse(res)
}

export async function logout() {
  await AsyncStorage.removeItem('current_user_key')
  return await api.get('/auth/logout')
}

export async function sendPasswordResetEmail(email) {
  const res = await api.post('/auth/send-reset-link/', { email })
  if (res.status < 400) {
    return res.data
  }
  throw new AxiosError(Object.values(res.data)[0])
}

export async function getCurrentUser() {
  const user = await api.get('auth/user')
  return user
}

export async function changePassword({ userId, oldPassword, newPassword }) {
  const res = await api.post('/auth/change-password/', { user_id: userId, old_password: oldPassword, new_password: newPassword })
  if (res.data.hasOwnProperty('error'))
    throw new AxiosError(res.data.error)

  return res.data.message
}

