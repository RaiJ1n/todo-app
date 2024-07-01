<template>
    <ul class="task-list space-y-2">
      <TaskItem 
        v-for="task in taskList" 
        :key="task.id" 
        :task="task" 
        @toggleTask="toggleTaskHandler" 
        @removeTask="removeTaskHandler" 
        @editTask="editTaskHandler" 
      />
    </ul>
  </template>
  
  <script setup>
  import TaskItem from './TaskItem.vue';
  
  const props = defineProps(['taskList']);
  const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);
  
  const toggleTaskHandler = (id) => {
    emit('toggleTask', id);
  };
  
  const removeTaskHandler = (id) => {
    emit('removeTask', id);
  };
  
  const editTaskHandler = ({ id, name }) => {
    emit('editTask', { id, name });
  };
  </script>
  
  <style scoped>
  .task-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  </style>
  