<template>
<nav class="navbar bg-base-100 shadow-md px-6">
    <div class="flex-1">
    <span class="text-xl font-bold">👟 ShopeVue</span>
    </div>
    <div class="flex gap-4 items-center">
    <RouterLink to="/" class="btn btn-ghost">Home</RouterLink>
    <RouterLink to="/product/1" class="btn btn-ghost">Products</RouterLink>
    <RouterLink to="/about" class="btn btn-ghost">About</RouterLink>
    <RouterLink to="/cart" class="relative btn btn-ghost">

        <span class="text-xl">🛒</span>

        <span
        v-if="cartStore.totalItems > 0"
        class="badge badge-error absolute -top-2 -right-2"
        >
        {{ cartStore.totalItems }}
        </span>

    </RouterLink>
    <div class="badge badge-primary badge-lg">
        Stock: {{ totalStock }}
    </div>
    </div>
</nav>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import { computed, onMounted, onUnmounted } from 'vue'

const productStore = useProductStore()
const cartStore = useCartStore()

const totalStock = computed(() => {
    return productStore.products.reduce(
        (sum, product) => sum + product.stock,
        0
    )
})

onMounted(() => console.log('NavBar mounted'))
onUnmounted(() => console.log('NavBar unmounted'))
</script>