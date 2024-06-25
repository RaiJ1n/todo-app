<template>
  <div>
    <h1 class="p-6 text-3xl font-bold text-center">Todo App</h1>
    <div class="w-[360px] mx-auto p-3">
      <TaskForm @addTodo="addTodoHandler" />
      <TaskList 
        :taskList="taskList" 
        @toggleTask="toggleIsCompleted" 
        @removeTask="removeTodo" 
        @updateTask="updateTodo"
      />
      <p class="text-center mt-4">Total Tasks: {{ taskCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';

const taskList = ref([]);

const taskCount = computed(() => taskList.value.length);

const removeTodo = (id) => {
  taskList.value = taskList.value.filter(t => t.id !== id);
};

const toggleIsCompleted = (id) => {
  taskList.value = taskList.value.map(task =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
};

const addTodoHandler = (payload) => {
  taskList.value.push(payload);
};

const updateTodo = ({ id, name }) => {
  taskList.value = taskList.value.map(task =>
    task.id === id ? { ...task, name } : task
  );
};
</script>
