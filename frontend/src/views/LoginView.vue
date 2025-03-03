<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
  >
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <!-- Email Field -->
        <div class="form-control">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            v-model="email"
            class="input input-bordered w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.email }"
            placeholder="example@example.com"
            required
          />
          <span v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</span>
        </div>

        <!-- Password Field -->
        <div class="form-control">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            autocomplete="on"
            type="password"
            v-model="password"
            class="input input-bordered w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            :class="{ 'border-red-500': errors.password }"
            placeholder="*********"
            required
          />
          <span v-if="errors.password" class="text-red-500 text-sm mt-1">{{
            errors.password
          }}</span>

          <span v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</span>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink to="/registro" class="font-medium text-indigo-600 hover:text-indigo-500"
              >¿Registrarse?</RouterLink
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="btn btn-primary w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AuthStore } from '../stores/AuthStore'
import * as yup from 'yup'

const email = ref('')
const password = ref('')
const errors = ref<{ email?: string; password?: string; message?: string }>({})

const validateForm = () => {
  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('El correo es requerido'),
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es requerida'),
  })
  try {
    schema.validateSync({ email: email.value, password: password.value }, { abortEarly: false })
    errors.value = {}
    return true
  } catch (validationErrors) {
    const errorObj: { [key: string]: string } = {}
    validationErrors.inner.forEach((error: yup.ValidationError) => {
      if (error.path) {
        errorObj[error.path] = error.message
      }
    })
    errors.value = errorObj
    return false
  }
}

const onSubmit = async () => {
  if (validateForm()) {
    const message = await AuthStore().login(email.value, password.value)
    if (message) {
      errors.value.message = 'Credenciales incorrectas'
    }
  }
}
</script>
