<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="bg-black p-4 shadow-md">
      <nav class="container mx-auto flex justify-between items-center">
        <div class="text-white text-2xl font-bold">Actividad 2</div>

        <div class="flex space-x-6">
          <RouterLink
            to="/login"
            class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
            v-if="!AuthStore().IsLogged"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/registro"
            class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
            v-if="!AuthStore().IsLogged"
          >
            Registro
          </RouterLink>
          <RouterLink
            to="/"
            class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
            v-if="AuthStore().IsLogged"
          >
            Dashboard
          </RouterLink>
          <button
            class="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2"
            v-on:click="logout"
            v-if="AuthStore().IsLogged"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import { AuthStore } from './stores/AuthStore'

function logout() {
  AuthStore().logout()
}
</script>
