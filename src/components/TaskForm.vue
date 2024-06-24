<template>
    <div class="flex items-center gap-2">
      <div class="relative w-full min-w-[200px] h-10">
        <input
          v-model="inputTodo"
          class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline focus:outline-none disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border border-blue-gray-200 rounded-md px-3 py-2.5 focus:border-2 focus:border-gray-900"
          placeholder="Input Todo"
        />
        <label
          class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-black-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-gray-400 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-900">
          Input Todo
        </label>
      </div>
      <button
        v-on:click="addTodo"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const inputTodo = ref('');
  const emit = defineEmits(['addTodo']);
  
  const addTodo = () => {
    if (inputTodo.value.trim() !== '') {
      const todoForm = {
        id: Date.now(),
        name: inputTodo.value.trim(),
        isCompleted: false,
      };
      emit('addTodo', todoForm);
      inputTodo.value = '';
    }
  };
  </script>
  