<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>
  <div class="bg-[#6f42c1] min-h-screen flex flex-col items-center justify-center text-white p-4">
    <Nav />
    <Suspense>
      <RouterView />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
