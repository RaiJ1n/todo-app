<template>
    <div>
      <header class="bg-blue-900 p-4">
        <nav class="flex justify-between items-center w-9/12 mx-auto text-gray-50">
          <div>
            <router-link to="/" class="text-xl font-bold hover:underline">Todo App</router-link>
          </div>
          <ul v-if="!isAuthenticated" class="flex items-center gap-6">
            <li>
              <router-link to="/login" class="hover:underline">Login</router-link>
            </li>
            <li>
              <router-link to="/register" class="hover:underline">Register</router-link>
            </li>
          </ul>
          <ul v-if="isAuthenticated" class="flex items-center">
            <li>
              <button @click="logout" class="hover:underline">Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </template>
  
  <script setup>
  import { useAuth } from '@/store/authStore';
  import { useRouter } from 'vue-router'
  
  const { isAuthenticated, checkAuth } = useAuth()
  const router = useRouter()
  
  const logout = async () => {
    localStorage.removeItem('jwt')
    await checkAuth()
    router.push('/login')
  }
  </script>
  