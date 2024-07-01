<template>
  <div>
    <h1 class="p-6 text-3xl font-bold text-center">Todo App</h1>
    <div class="w-[360px] mx-auto p-3">
      <header class="flex justify-center gap-3 mb-4">
        <button class="px-4 py-2 border rounded bg-blue-500 text-white w-32" @click="toggleAddModal">Add Task</button>
      </header>
      <TaskList 
        :taskList="taskList" 
        @toggleTask="toggleIsCompleted" 
        @removeTask="removeTodo" 
        @editTask="updateTodo" 
      />
      <p class="text-center mt-4">Total Tasks: {{ taskCount }}</p>

      <!-- Add Task Modal -->
      <Modal :show="isAddModalShow" @toggleBackdrop="toggleBackdropHandler">
        <template #modal-header>
          <h3 class="text-lg font-bold">Add Task</h3>
        </template>
        <template #modal-content>
          <label class="input input-bordered flex items-center gap-2">
            <input v-model="newTaskName" type="text" class="grow p-2 border rounded" placeholder="Enter new task" />
          </label>
        </template>
        <template #default>
          <button class="px-4 py-2 border rounded bg-red-600 text-gray-50" @click="toggleAddModal">Cancel</button>
          <button class="px-4 py-2 border rounded bg-blue-500 text-white" @click="addTodoHandler">Add</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskList from './components/TaskList.vue';
import Modal from './components/Modal.vue';

const taskList = ref([]);
const newTaskName = ref('');

const isAddModalShow = ref(false);

const taskCount = computed(() => taskList.value.length);

const toggleAddModal = () => {
  isAddModalShow.value = !isAddModalShow.value;
};

const toggleBackdropHandler = (payload) => {
  isAddModalShow.value = !payload;
};

const removeTodo = (id) => {
  taskList.value = taskList.value.filter(t => t.id !== id);
};

const toggleIsCompleted = (id) => {
  taskList.value = taskList.value.map(task =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
};

const addTodoHandler = () => {
  if (newTaskName.value.trim() !== '') {
    const newTask = {
      id: Date.now(),
      name: newTaskName.value.trim(),
      isCompleted: false,
    };
    taskList.value.push(newTask);
    newTaskName.value = '';
    toggleAddModal();
  }
};

const updateTodo = ({ id, name }) => {
  taskList.value = taskList.value.map(task =>
    task.id === id ? { ...task, name } : task
  );
};
</script>
