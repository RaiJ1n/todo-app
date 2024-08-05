<template>
  <div>
    <h1 class="p-6 text-3xl font-bold text-center">Welcome</h1>
    <div class="w-[360px] mx-auto p-3">
      <header class="flex justify-center gap-3 mb-4">
        <button class="w-32 px-4 py-2 text-white bg-blue-500 border rounded" @click="toggleAddModal">Add Task</button>
      </header>
      <TaskList v-if="taskList && taskList.length > 0" :taskList="taskList" @toggleTask="toggleIsCompleted"
        @removeTask="removeTask" @editTask="editTaskHandler" />
      <p class="mt-4 text-center">Total Tasks: {{ taskCount }}</p>

      <!-- Add Task Modal -->
      <Modal :show="isAddModalShow" @toggleBackdrop="toggleAddModal">
        <template #modal-header>
          <h3 class="text-lg font-bold">Add Task</h3>
        </template>
        <template #modal-content>
          <label class="flex items-center gap-2 input input-bordered">
            <input v-model="newTaskName" type="text" class="p-2 border rounded grow" placeholder="Enter new task" />
          </label>
        </template>
        <template #default>
          <button class="px-4 py-2 bg-red-600 border rounded text-gray-50" @click="toggleAddModal">Cancel</button>
          <button class="px-4 py-2 text-white bg-blue-500 border rounded" @click="addTaskHandler">Add</button>
        </template>
      </Modal>

      <!-- Update Task Modal -->
      <Modal :show="isUpdateModalShow" @toggleBackdrop="toggleUpdateModal">
        <template #modal-header>
          <h3 class="text-lg font-bold">Update Task</h3>
        </template>
        <template #modal-content>
          <label class="flex items-center gap-2 input input-bordered">
            <input v-model="editedTaskName" type="text" class="p-2 border rounded grow"
              placeholder="Enter updated task name" />
          </label>
        </template>
        <template #default>
          <button class="px-4 py-2 bg-red-600 border rounded text-gray-50" @click="toggleUpdateModal">Cancel</button>
          <button class="px-4 py-2 text-white bg-blue-500 border rounded" @click="saveUpdatedTaskHandler">Save</button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TaskList from '../components/TaskList.vue';
import Modal from '../components/Modal.vue';
import { useTodo } from '../store/TodoStore.js';

onMounted(async () => {
  await fetchTodo();
});

const { taskList, fetchTodo, addTask, updateTask, removeTask: storeRemoveTask, toggleTaskCompletion } = useTodo();


const newTaskName = ref('');
const editedTaskName = ref('');
const editingTaskId = ref(null);

const isAddModalShow = ref(false);
const isUpdateModalShow = ref(false);

const taskCount = computed(() => taskList.value ? taskList.value.length : 0);

const toggleAddModal = () => {
  isAddModalShow.value = !isAddModalShow.value;
};

const toggleUpdateModal = () => {
  isUpdateModalShow.value = !isUpdateModalShow.value;
};

const toggleIsCompleted = (id) => {
  toggleTaskCompletion(id);
};

const removeTask = (id) => {
  storeRemoveTask(id);
};

const addTaskHandler = () => {
  if (newTaskName.value.trim() !== '') {
    addTask(newTaskName.value.trim());
    newTaskName.value = '';
    toggleAddModal();
  }
};

const editTaskHandler = (id, name) => {
  console.log(id);
  editingTaskId.value = id
  editedTaskName.value = name;
  toggleUpdateModal();
};

const saveUpdatedTaskHandler = () => {

  if (editedTaskName.value !== '') {
    updateTask(editingTaskId.value, editedTaskName.value);
    toggleUpdateModal();
  }
};
</script>