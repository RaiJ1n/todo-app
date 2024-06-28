<template>
    <div class="flex items-center justify-between p-2 border-b">
      <div @click="toggleComplete" :class="{ 'line-through': task.isCompleted }" class="cursor-pointer">
        {{ task.name }}
      </div>
      <div class="flex items-center gap-3">
        <button @click="showUpdateModal" class="text-blue-600">Edit</button>
        <button @click="removeTask" class="text-red-600">Delete</button>
      </div>
      <Modal
        :isVisible="isUpdateModalVisible"
        title="Update Task"
        :task="task"
        @close="hideUpdateModal"
        @confirm="updateTodo"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Modal from './Modal.vue';
  
  const props = defineProps({
    task: Object,
  });
  
  const emit = defineEmits(['toggleTask', 'removeTask', 'updateTask']);
  
  const isUpdateModalVisible = ref(false);
  
  const toggleComplete = () => {
    emit('toggleTask', props.task.id);
  };
  
  const removeTask = () => {
    emit('removeTask', props.task.id);
  };
  
  const showUpdateModal = () => {
    isUpdateModalVisible.value = true;
  };
  
  const hideUpdateModal = () => {
    isUpdateModalVisible.value = false;
  };
  
  const updateTodo = (taskName) => {
    emit('updateTask', { id: props.task.id, name: taskName });
    hideUpdateModal();
  };
  </script>
  