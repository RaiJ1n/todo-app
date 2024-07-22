<template>
  <div>
    <Header/>
    <div class="w-[360px] mx-auto p-3 ">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Headers.vue';
</script>

