<template>
    <div>
      <TaskItem
        v-for="task in taskList"
        :key="task.id"
        :task="task"
        @toggleTask="toggleTask"
        @removeTask="removeTask"
        @updateTask="updateTask"
      />
    </div>
  </template>
  
  <script setup>
  import TaskItem from './TaskItem.vue';
  
  const props = defineProps({
    taskList: Array,
  });
  
  const emit = defineEmits(['toggleTask', 'removeTask', 'updateTask']);
  
  const toggleTask = (id) => {
    emit('toggleTask', id);
  };
  
  const removeTask = (id) => {
    emit('removeTask', id);
  };
  
  const updateTask = (updatedTask) => {
    emit('updateTask', updatedTask);
  };
  </script>
  