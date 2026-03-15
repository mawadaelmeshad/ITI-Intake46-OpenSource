<template>
<div class="container mx-auto px-6 py-8">

    <div v-if="currentProduct">
    <ProductDetails
        :product="currentProduct"
        @buy="handleBuy"
    />

    <div class="mt-12">
        <h2 class="text-2xl text-black font-bold mb-6">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
            v-for="product in relatedProducts"
            :key="product.id"
            :product="product"
        />
        </div>
    </div>
    </div>

    <!-- Fallback if product ID doesn't exist -->
    <div v-else class="text-center py-20">
    <h2 class="text-2xl font-bold">Product not found</h2>
    <RouterLink to="/" class="btn btn-primary mt-4">Back to Home</RouterLink>
    </div>

</div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetails from '../components/ProductDetails.vue'
import ProductCard from '../components/ProductCard.vue'

const props = defineProps({
products: {
    type: Array,
    required: true
}
})

const emit = defineEmits(['buy'])

const route = useRoute()

const currentProduct = computed(() =>
props.products.find(p => p.id === Number(route.params.id))
)

const relatedProducts = computed(() =>
props.products.filter(p => p.id !== Number(route.params.id))
)

function handleBuy(productId) {
emit('buy', productId)
}

onMounted(() => console.log(`ProductView mounted for ID: ${route.params.id}`))
onUnmounted(() => console.log('ProductView unmounted'))
</script>