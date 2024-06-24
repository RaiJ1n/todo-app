<template>
  <div>
    <h1 class="p-6 text-3xl font-bold text-center">Todo App</h1>
    <div class="w-[360px] mx-auto p-3">
      <TaskForm @addTodo="addTodoHandler" />
      <TaskList :taskList="taskList" @toggleTask="toggleIsCompleted" @removeTask="removeTodo" />
      <p class="text-center mt-4">Total Tasks: {{ taskCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskList from './components/TaskList.vue'
import TaskForm from './components/TaskForm.vue'

const taskList = ref([]);

const taskCount = computed(() => taskList.value.length);

const removeTodo = (id) => {
  const filteredTodo = taskList.value.filter(t => t.id !== id);
  taskList.value = filteredTodo;
};

const toggleIsCompleted = async (id) => {
  console.log(id);
  const updatedTask = taskList.value.map((task) =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
  taskList.value = updatedTask;
  console.log(updatedTask);
};

const addTodoHandler = (payload) => {
  console.log(payload);
  taskList.value.push(payload);
};
</script>
