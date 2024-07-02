<template>
    <Teleport to="body">
      <div v-if="show" class="backdrop" @click="toggleBackdropHandler"></div>
      <dialog :open="show" class="modal z-[999] rounded-xl p-6 overflow-hidden">
        <div>
          <header class="p-3">
            <slot name="modal-header"></slot>
          </header>
          <main class="p-3">
            <slot name="modal-content"></slot>
          </main>
          <div class="flex gap-3 justify-end">
            <slot/>
          </div>
        </div>
      </dialog>
    </Teleport>
  </template>
  
  <script setup>
  const props = defineProps(['show']);
  const emit = defineEmits(['toggleBackdrop']);
  
  const toggleBackdropHandler = () => {
      emit('toggleBackdrop', props.show);
  };
  </script>
  
  <style scoped>
  .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 998;
  }
  .modal {
      position: fixed;
      top: 50%;
      left: 21%;
      transform: translate(-50%, -50%);
  }
  </style>
  