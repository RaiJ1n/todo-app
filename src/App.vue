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
        @removeTask="removeTask" 
        @editTask="editTaskHandler" 
      />
      <p class="text-center mt-4">Total Tasks: {{ taskCount }}</p>

      <!-- Add Task Modal -->
      <Modal :show="isAddModalShow" @toggleBackdrop="toggleAddModal">
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
          <button class="px-4 py-2 border rounded bg-blue-500 text-white" @click="addTaskHandler">Add</button>
        </template>
      </Modal>

      <!-- Update Task Modal -->
      <Modal :show="isUpdateModalShow" @toggleBackdrop="toggleUpdateModal">
        <template #modal-header>
          <h3 class="text-lg font-bold">Update Task</h3>
        </template>
        <template #modal-content>
          <label class="input input-bordered flex items-center gap-2">
            <input v-model="editedTaskName" type="text" class="grow p-2 border rounded" placeholder="Enter updated task name" />
          </label>
        </template>
        <template #default>
          <button class="px-4 py-2 border rounded bg-red-600 text-gray-50" @click="toggleUpdateModal">Cancel</button>
          <button class="px-4 py-2 border rounded bg-blue-500 text-white" @click="saveUpdatedTaskHandler">Save</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskList from './components/TaskList.vue';
import Modal from './components/Modal.vue';
import store from './store/TodoStore.js';

const taskList = computed(() => store.getTaskList().value);
const newTaskName = ref('');
const editedTaskName = ref('');
const editingTaskId = ref(null);

const isAddModalShow = ref(false);
const isUpdateModalShow = ref(false);

const taskCount = computed(() => taskList.value.length);

const toggleAddModal = () => {
    isAddModalShow.value = !isAddModalShow.value;
};

const toggleUpdateModal = () => {
    isUpdateModalShow.value = !isUpdateModalShow.value;
};

const toggleIsCompleted = (id) => {
    store.toggleTaskCompletion(id);
};

const removeTask = (id) => {
    store.removeTask(id);
};

const addTaskHandler = () => {
    if (newTaskName.value.trim() !== '') {
        store.addTask(newTaskName.value.trim());
        newTaskName.value = '';
        toggleAddModal();
    }
};

const editTaskHandler = (task) => {
    editingTaskId.value = task.id;
    editedTaskName.value = task.name;
    toggleUpdateModal();
};

const saveUpdatedTaskHandler = () => {
    if (editedTaskName.value.trim() !== '') {
        store.updateTask(editingTaskId.value, editedTaskName.value.trim());
        toggleUpdateModal();
    }
};
</script>
