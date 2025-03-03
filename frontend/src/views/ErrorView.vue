<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 text-center">
      <!-- Error Title -->
      <h1 class="text-7xl font-bold text-red-500">404</h1>
      <h2 class="text-3xl font-medium text-gray-800">Página no encontrada</h2>
      <p class="text-gray-600">
        Serás redireccionado a la página inicial en
        <span class="font-bold text-indigo-600">{{ count }}</span> segundos.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const count = ref(3)

const startCountdown = () => {
  const timer = setInterval(() => {
    if (count.value > 1) {
      count.value--
    } else {
      clearInterval(timer)
      router.push('/')
    }
  }, 1000)
}

startCountdown()
</script>
