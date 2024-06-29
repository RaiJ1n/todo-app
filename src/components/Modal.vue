<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded shadow-lg w-[300px]">
        <h2 class="text-xl mb-4">{{ title }}</h2>
        <input
          v-model="taskName"
          type="text"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter task name"
        />
        <div class="flex justify-end gap-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="confirmAction" class="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    isVisible: Boolean,
    title: String,
    task: Object,
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const taskName = ref('');
  
  watch(props.task, (newTask) => {
    taskName.value = newTask ? newTask.name : '';
  }, { immediate: true });
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmAction = () => {
    emit('confirm', taskName.value);
  };
  </script>
  