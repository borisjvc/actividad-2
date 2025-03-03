<template>
  <section
    class="mb-12 p-6 rounded-lg shadow-sm bg-base-100 transition-all duration-300 hover:shadow-md"
    style="min-height: 100vh"
  >
    <div id="XSS">
      <h2 class="text-2xl font-bold mb-4">Cross-Site Scripting (XSS)</h2>
      <p class="mb-4">
        XSS permite inyectar scripts maliciosos en páginas web vistas por otros usuarios.
      </p>
      <form @submit.prevent="submitComment" class="mb-4">
        <label for="commentUser" class="block mb-2">Introduce un script:</label>
        <input
          autocomplete="false"
          id="commentUser"
          v-model="commentUser"
          class="input input-bordered w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2"
        >
          Enviar
        </button>
      </form>
      <div v-html="xssOutput" class="prose mb-4"></div>
      <div>
        <h3 class="text-xl font-bold mb-2">Ejemplos básicos de XSS:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(comment, index) in comments" :key="index" class="mb-2">
            <p v-html="comment.comment"></p>
          </li>
        </ul>
      </div>
      <div class="text-center">
        <button
          @click="show = !show"
          type="submit"
          class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out bg-sky-500 hover:bg-sky-600 rounded-lg px-4 py-2"
        >
          Mostrar
        </button>
      </div>
      <div v-if="show">
        <h3 class="text-xl font-bold mb-2">Prevención de XSS:</h3>
        <p class="mb-2">
          Para prevenir XSS, es importante escapar correctamente los datos de entrada y utilizar
          métodos seguros para renderizar contenido HTML.
        </p>
        <ul class="list-disc list-inside">
          <li>Escapar caracteres especiales en el lado del servidor.</li>
          <li>Utilizar bibliotecas de sanitización de HTML.</li>
          <li>Implementar Content Security Policy (CSP).</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { GetComments, PostComment } from '@/services/AttacksService'
import { onMounted, ref, type Ref } from 'vue'
import type { Comment } from '../interfaces/Comment'

const xssInput = ref('')
const xssOutput = ref('')
const comments: Ref<Comment[]> = ref([{ id: 1, user_id: 1, comment: 'test' }])
const commentUser = ref('')
const show = ref(false)

const submitComment = async () => {
  await PostComment(commentUser.value, 1)

  await getComments()
}

console.log(comments.value)
async function getComments() {
  const response = await GetComments()
  if (response?.data.results.length > 0) {
    comments.value = response?.data.results
  }
}
onMounted(async () => {
  const response = await GetComments()
  if (response?.data.results.length > 0) {
    comments.value = response?.data.results
  } else {
    comments.value = [{ id: 1, user_id: 1, comment: 'test' }]
  }
})
</script>
