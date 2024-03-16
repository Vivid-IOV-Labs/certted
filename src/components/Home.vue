<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="text-center max-w-2xl">
        <h1 class="text-6xl font-bold leading-tight mb-4">
            Sign your work. <br> Beat the spam.
        </h1>
        <p class="text-xl mb-8">
            Certted empowers creators and businesses to add a cryptographically verifiable signature to all the
            content they release online.
        </p><button
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-white text-[#6f42c1] py-3 px-8 rounded-full"><RouterLink to="/signlink" >Try It Today</RouterLink></button>
    </div>
</template>
