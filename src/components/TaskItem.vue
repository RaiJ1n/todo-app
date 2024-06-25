<template>
    <li class="flex gap-3 p-2 px-2 my-2 rounded-sm shadow">
      <input type="checkbox" :checked="isCompleted" @change="toggleTaskHandler">
      <p v-if="!isUpdate" :class="{ 'line-through': isCompleted }">{{ name }}</p>
      <input v-else v-model="updatedName" class="border p-1" />
    
      <button v-show="isCompleted" class="px-3 ml-auto bg-red-600 text-black" @click="removeTaskHandler">Remove</button>
      <button v-show="isCompleted = !isUpdate" @click="toggleUpdateMode" class="ml-auto text-black">
        <font-awesome-icon icon="pen-to-square" />
      </button>
      <button v-show="isUpdate" @click="updateTaskHandler" class="px-2 ml-auto bg-blue-400 text-black rounded-">Update</button>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['toggleTask', 'removeTask', 'updateTask']);
  
  const isUpdate = ref(false);
  const updatedName = ref(props.name);
  
  const toggleTaskHandler = () => {
    emit('toggleTask', props.id);
  };
  
  const removeTaskHandler = () => {
    emit('removeTask', props.id);
  };
  
  const toggleUpdateMode = () => {
    isUpdate.value = !isUpdate.value;
    if (!isUpdate.value) {
      updatedName.value = props.name;
    }
  };
  
  const updateTaskHandler = () => {
    if (updatedName.value.trim() !== '') {
      emit('updateTask', { id: props.id, name: updatedName.value.trim() });
      isUpdate.value = false;
    }
  };
  </script>
  