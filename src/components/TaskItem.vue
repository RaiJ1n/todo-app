<template>
    <li class="flex gap-3 p-2 my-2 rounded-sm shadow">
        <input type="checkbox" :checked="isCompleted" @change="toggleTaskHandler">
        <p :class="{ 'line-through': isCompleted }">{{ name }}</p>
        <button v-show="isCompleted" class="px-3 ml-auto bg-red-600 text-black" @click="removeTaskHandler">Remove</button>
    </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

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
})
const emit = defineEmits(['toggleTask', 'removeTask'])

const toggleTaskHandler = () => {
    emit('toggleTask', props.id)
}
const removeTaskHandler = () => {
    emit('removeTask', props.id)
}
</script>
