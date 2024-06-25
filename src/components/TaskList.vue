<template>
    <section>
      <h2 class="p-6 text-3xl font-bold text-center">Your Task</h2>
      <ul class="">
        <TaskItem 
          @removeTask="removeTodo" 
          @toggleTask="toggleCheckbox" 
          @updateTask="updateTodo"
          v-for="task in taskList" 
          :id="task.id"
          :key="task.id" 
          :name="task.name" 
          :isCompleted="task.isCompleted" 
        />
      </ul>
    </section>
  </template>
  
  <script setup>
  import TaskItem from './TaskItem.vue';
  const props = defineProps(['taskList']);
  const emit = defineEmits(['toggleTask', 'removeTask', 'updateTask']);
  
  const toggleCheckbox = (payload) => {
    emit('toggleTask', payload);
  };
  
  const removeTodo = (payload) => {
    emit('removeTask', payload);
  };
  
  const updateTodo = (payload) => {
    emit('updateTask', payload);
  };
  </script>
  