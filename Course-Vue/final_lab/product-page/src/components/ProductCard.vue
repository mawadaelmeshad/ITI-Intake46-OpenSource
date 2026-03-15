<template>
<div class="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="goToProduct">
    <figure class="relative">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
    <div v-if="product.badge" class="absolute top-2 left-2 badge badge-secondary">
        {{ product.badge }}
    </div>
    </figure>

    <div class="card-body p-4">
    <h2 class="card-title text-base">{{ product.name }}</h2>

    <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-primary">${{ discountedPrice }}</span>
        <span v-if="product.discount > 0" class="text-sm line-through text-gray-400">
        ${{ product.price }}
        </span>
    </div>

    <div class="card-actions justify-end mt-2">
        <button class="text-white cursor-pointer btn-sm" @click.stop="goToProduct">
        View Product
        </button>
    </div>
    <button
        class="btn btn-primary btn-sm"
        :disabled="product.stock === 0"
        @click.stop="addToCart"
        >
        {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
    </button>
    </div>
</div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
product: { type: Object, required: true }
})

const router = useRouter()
const cartStore = useCartStore()

const discountedPrice = computed(() => {
if (props.product.discount === 0) return props.product.price
return (props.product.price * (1 - props.product.discount / 100)).toFixed(2)
})

function goToProduct() {
router.push(`/product/${props.product.id}`)
}

function addToCart() {
    cartStore.addToCart(props.product)
}
onMounted(() => console.log(`ProductCard mounted — ${props.product.name}`))
onUnmounted(() => console.log(`ProductCard unmounted — ${props.product.name}`))
</script>