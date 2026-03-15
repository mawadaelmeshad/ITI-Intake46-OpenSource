<template>
<div>
    <CarouselBanner />
    

    <div class="container mx-auto px-6 py-8">
    <h2 class="text-2xl text-black font-bold mb-6">Our Products</h2>
    <div v-if="productStore.loading">
        Loading...
    </div>
    <div  v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
        v-for="p in productStore.products"
        :key="p.id"
        :product="p"
        />
    </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import CarouselBanner from '../components/CarouselBanner.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()


onMounted(() => productStore.fetchProducts())
onUnmounted(() => console.log('HomeView unmounted'))
</script>