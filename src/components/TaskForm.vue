<template>
    <div class="flex justify-center items-center gap-2">
      <button @click="showCreateModal" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Add Task
      </button>
      <Modal
        :isVisible="isCreateModalVisible"
        title="Create Task"
        @close="hideCreateModal"
        @confirm="addTodo"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Modal from './Modal.vue';
  
  const isCreateModalVisible = ref(false);
  const inputTodo = ref('');
  
  const emit = defineEmits(['addTodo']);
  
  const showCreateModal = () => {
    isCreateModalVisible.value = true;
  };
  
  const hideCreateModal = () => {
    isCreateModalVisible.value = false;
  };
  
  const addTodo = (taskName) => {
    if (taskName.trim() !== '') {
      const todoForm = {
        id: Date.now(),
        name: taskName.trim(),
        isCompleted: false,
      };
      emit('addTodo', todoForm);
      hideCreateModal();
    }
  };
  </script>
  

  <style scoped>
  .flex {
    display: flex;
  }
  .justify-center {
    justify-content: center;
  }
  .items-center {
    align-items: center;
  }
  </style>
  