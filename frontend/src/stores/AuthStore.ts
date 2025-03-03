import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginService, RegisterService, LogoutService } from '../services/LoginService'
import { useStorage } from '@vueuse/core'
import type { User } from '../interfaces/User'
import router from '@/router'

const OK_STATUS = 200

export const AuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = useStorage('token', '')
  const IsLogged = computed(() => token.value.length > 0)

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response?.status === OK_STATUS) {
        user.value = response?.data
        token.value = user.value.token
        router.push('/')
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión', error)

      return error
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await RegisterService(email, password)
      if (response.status === OK_STATUS) {
        user.value = response.data
        token.value = user.value.token
      }
    } catch (error: any) {
      console.error('Error al registrarse', error)
    }
  }

  async function logout() {
    try {
      const response = await LogoutService()
      console.log(response)
      if (response.status === OK_STATUS) {
        user.value = {} as User
        token.value = ''
        router.push('/login')
      }
    } catch (error: any) {
      console.error('Error al salir', error)
    }
  }

  return { login, register, logout, IsLogged, token }
})
