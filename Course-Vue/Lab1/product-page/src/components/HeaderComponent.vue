<template>
<nav class="navbar bg-base-100 shadow-md px-6">
    <div class="flex-1">
    <span class="text-xl font-bold">👟 ShopeVue</span>
    </div>
    <div class="flex gap-4 items-center">
    <RouterLink to="/" class="btn btn-ghost">Home</RouterLink>
    <RouterLink to="/product/1" class="btn btn-ghost">Products</RouterLink>
    <RouterLink to="/about" class="btn btn-ghost">About</RouterLink>

    <div class="badge badge-primary badge-lg">
        Stock: {{ totalStock }}
    </div>
    </div>
</nav>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
totalStock: {
    type: Number,
    required: true
}
})

onMounted(() => console.log('NavBar mounted'))
onUnmounted(() => console.log('NavBar unmounted'))
</script>