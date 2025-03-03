<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
      <h1 class="text-3xl font-bold text-center text-gray-800">Registro</h1>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <!-- Email or Username Field -->
        <div class="form-control">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="userData.email"
            type="text"
            placeholder="Correo Electronico"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.email }"
          />
          <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
        </div>

        <!-- Password Field -->
        <div class="form-control">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="userData.password"
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.password }"
          />
          <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{
            errors.password
          }}</span>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-control">
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{
              'border-red-500': confirmPassword !== userData.password && confirmPassword.length > 0,
            }"
          />
          <span
            v-if="confirmPassword !== userData.password && confirmPassword.length > 0"
            class="text-red-500 text-sm mt-1"
          >
            Las contraseñas no coinciden
          </span>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AuthStore } from '../stores/AuthStore'
import * as yup from 'yup'
import router from '@/router'

const userData = reactive({
  email: '',
  password: '',
})
const confirmPassword = ref('')
const errors = reactive<{ email?: string; password?: string }>({})

const validateForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email('Correo inválido').required('El correo es requerido'),
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es requerida'),
  })
  try {
    schema.validateSync(userData, { abortEarly: false })
    errors.email = undefined
    errors.password = undefined
    return true
  } catch (validationErrors) {
    const errorObj = { email: undefined, password: undefined }
    validationErrors.inner.forEach((error: yup.ValidationError) => {
      if (error.path) {
        errorObj[error.path] = error.message
      }
    })
    errors.email = errorObj.email
    errors.password = errorObj.password
    return false
  }
}

const onSubmit = () => {
  if (validateForm() && confirmPassword.value === userData.password) {
    AuthStore().register(userData.email, userData.password)
    router.push('/login')
  }
}
</script>
