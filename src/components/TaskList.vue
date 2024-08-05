<template>
  <ul class="space-y-2 task-list">
    <TaskItem v-for="task in taskList" :id="task._id" :key="task.id" :name="task.todo" :isFinished="task.isFinished"
      @toggleTask="toggleTaskHandler" @removeTask="removeTaskHandler" @editTask="editTaskHandler" />
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue';
import { useTodo } from '@/store/TodoStore.js';
const { taskList, fetchTodo } = useTodo();


fetchTodo();

const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);

const toggleTaskHandler = (id) => {
  emit('toggleTask', id);
};

const removeTaskHandler = (id) => {
  emit('removeTask', id);
};

const editTaskHandler = (id, taskName) => {
  console.log(id, taskName);
  emit('editTask', id);
};
</script>

<style scoped>
.task-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>