<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <nav class="absolute top-0 left-0 right-0 flex justify-between p-4">
        <span class="text-2xl font-bold"><RouterLink to="/" >Certted</RouterLink></span>
        <div class="inline-flex items-center justify-center space-x-4 text-center max-w-2xl ">
            <RouterLink to="/signlink" class="hover:underline">Creators</RouterLink>
            <a class="hover:underline" href="#">Enterprise</a>
            <a class="hover:underline" href="#">About Us</a>
        </div>
        <div class="flex space-x-4">
            <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-white text-[#6f42c1]">Get
                Verified</button>
            <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-white text-white">
                <RouterLink to="/checklink" >Check Link</RouterLink>
            </button>
        </div>
    </nav>
</template>
