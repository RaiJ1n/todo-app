<template>
    <Teleport to="body">
        <div v-if="show" class="backdrop" @click="toggleBackdropHandler"></div>
        <dialog :open="show" class=" z-[999] rounded-xl p-6  overflow-hidden">
            <div>
                <header class="p-3">
                    <slot name="modal-header">

                    </slot>
                </header>
                <main class="p-3">
                    <slot name="modal-content">

                    </slot>
                </main>
                <!-- Action -->
                <div class="flex gap-3 justify-end">
                    <slot />
                </div>

            </div>
        </dialog>
    </Teleport>
</template>

<script setup>
const props = defineProps(['show'])
const emit = defineEmits(['toggleBackdrop'])

const toggleBackdropHandler = () => {
    emit('toggleBackdrop', props.show)
    console.log(props.show);
}


</script>