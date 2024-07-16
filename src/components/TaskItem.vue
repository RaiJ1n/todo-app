<template>
    <li class="task-item p-3 border-b border-gray-200 shadow-md">
      <div class="flex justify-between items-center">
        <div class="flex items-center grow">
          <input type="checkbox" :checked="task.isCompleted" @change="toggleTaskHandler(task.id)" class="mr-2" />
          <span @dblclick="editTask" :class="{ 'line-through': task.isCompleted }">{{ task.name }}</span>
        </div>
        <div class="flex gap-2">
          <button v-if="task.isCompleted" @click="removeTaskHandler(task.id)" class="px-2 py-1 border rounded bg-red-500 text-white">Remove</button>
        </div>
      </div>
    </li>
  </template>
  
  <script setup>
  const props = defineProps(['task']);
  const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);
  
  const toggleTaskHandler = (id) => {
    emit('toggleTask', id);
  };
  
  const removeTaskHandler = (id) => {
    emit('removeTask', id);
  };
  
  const editTask = () => {
    emit('editTask', props.task);
  };
  </script>
  
  <style scoped>
  .line-through {
    text-decoration: line-through;
  }
  .shadow-md {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  </style>
  