<template>
    <li class="task-item p-3 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div @click="toggleTaskHandler(task.id)" class="flex items-center grow">
          <input type="checkbox" :checked="task.isCompleted" class="mr-2" />
          <span :class="{ 'line-through': task.isCompleted }" @dblclick="editTask">{{ task.name }}</span>
        </div>
        <div class="flex gap-2">
          <button v-if="task.isCompleted" @click="removeTaskHandler(task.id)" class="px-4 py-2 border rounded bg-red-500 text-white">Remove</button>
        </div>
      </div>
      <div v-if="isEditing" class="flex items-center mt-2">
        <input v-model="editedTaskName" type="text" class="mr-2 p-2 border rounded grow" @keyup.enter="saveTask" />
        <button @click="saveTask" class="px-4 py-2 border rounded bg-blue-500 text-white mr-2">Save</button>
        <button @click="cancelEdit" class="px-4 py-2 border rounded bg-gray-500 text-white">Cancel</button>
      </div>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['task']);
  const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);
  
  const isEditing = ref(false);
  const editedTaskName = ref('');
  
  const toggleTaskHandler = (id) => {
    emit('toggleTask', id);
  };
  
  const removeTaskHandler = (id) => {
    emit('removeTask', id);
  };
  
  const editTask = () => {
    isEditing.value = true;
    editedTaskName.value = props.task.name;
  };
  
  const saveTask = () => {
    emit('editTask', { id: props.task.id, name: editedTaskName.value });
    isEditing.value = false;
  };
  
  const cancelEdit = () => {
    isEditing.value = false;
  };
  </script>
  
  <style scoped>
  .line-through {
    text-decoration: line-through;
  }
  </style>
  