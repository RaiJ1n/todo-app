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
import { useTodo } from '@/store/TodoStore.js';

const { taskList, fetchTodo } = useTodo();

// Fetch tasks immediately in the setup function
fetchTodo();

const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);

const toggleTaskHandler = (id) => {
  emit('toggleTask', id);
};

const removeTaskHandler = (id) => {
  emit('removeTask', id);
};

const editTaskHandler = (task) => {
  emit('editTask', task);
};
</script>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
