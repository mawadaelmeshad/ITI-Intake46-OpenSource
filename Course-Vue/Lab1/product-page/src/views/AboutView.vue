<template>
<div class="container mx-auto px-6 py-16 max-w-6xl">
    <div class="card bg-base-100 shadow-xl p-8">
    <h1 class="text-4xl font-bold mb-2">About This Store</h1>
    <div class="divider"></div>

    <div class="space-y-4">
        <p><span class="font-semibold">Student:</span> Mawadah</p>
        <p><span class="font-semibold">Course:</span> VueJS — Day 2</p>

        <p class="mt-4 text-gray-400">
        ShopeVue is a modern shoe store built with Vue 3, Vue Router, and DaisyUI.
        It demonstrates multi-page SPA architecture with proper component
        communication using props and emits — all data flows from App.vue
        downward, and all events bubble back up.
        </p>
    </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => console.log('AboutView mounted'))
onUnmounted(() => console.log('AboutView unmounted'))
</script>
