<template>
  <li class="p-3 border-b border-gray-200 shadow-md task-item">
    <div class="flex items-center justify-between">
      <div class="flex items-center grow">
        <input type="checkbox" :checked="props.isFinished" @change="toggleTaskHandler(props.id)" class="mr-2" />
        <span :class="{ 'line-through': props.isFinished }" @dblclick="editTask">{{ props.name }}</span>
      </div>
      <div class="flex gap-2">
        <button v-if="props.isFinished" @click="removeTaskHandler(props.id)"
          class="px-2 py-1 text-white bg-red-500 border rounded">Remove</button>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps(['name', 'id', 'isFinished']);
const emit = defineEmits(['toggleTask', 'removeTask', 'editTask']);

const toggleTaskHandler = (id) => {
  emit('toggleTask', id);
};

const removeTaskHandler = (id) => {
  emit('removeTask', id);
};

const editTask = () => {
  emit('editTask', props.id, props.name);
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

.shadow-md {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>