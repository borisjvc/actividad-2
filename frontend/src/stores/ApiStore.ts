import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginService, RegisterService, LogoutService } from '../services/LoginService'
import { useStorage } from '@vueuse/core'
import type { User } from '../interfaces/User'
import router from '@/router'
import { GetComments, PostComment } from '@/services/AttacksService'

const OK_STATUS = 200

export const ApiStore = defineStore('api', () => {
  const comments = ref([])

  async function getComments() {
    try {
      const response = await GetComments()
      if (response?.status === OK_STATUS) {
        comments.value = response?.data.results
      }
    } catch (error: any) {
      console.error('Error al obtener comentarios', error)

      return error
    }
  }

  async function postComment(comment: string, user_id: number) {
    try {
      const response = await PostComment(comment, user_id)
      if (response?.status === OK_STATUS) {
        await getComments()
      }
    } catch (error: any) {
      console.error('Error al publicar comentario', error)
    }
  }
  return { getComments, postComment }
})
