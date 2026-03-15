<template>
<div class="card lg:card-side bg-base-100 shadow-xl">
    <figure class="lg:w-1/2">
    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
    </figure>

    <div class="card-body lg:w-1/2">
    <div v-if="product.badge" class="mb-2">
        <span class="badge badge-secondary badge-lg">{{ product.badge }}</span>
    </div>

    <h1 class="text-3xl font-bold">{{ product.name }}</h1>
    <p class="text-gray-500">{{ product.description }}</p>

    <div class="flex items-center gap-3 my-2">
        <span class="text-3xl font-bold text-primary">${{ discountedPrice }}</span>
        <span v-if="product.discount > 0" class="text-lg line-through text-gray-400">
        ${{ product.price }}
        </span>
        <span v-if="product.discount > 0" class="badge badge-accent">
        {{ product.discount }}% OFF
        </span>
    </div>

    <p v-if="product.stock > 0" class="text-success font-semibold">
        ✓ In Stock ({{ product.stock }} left)
    </p>
    <p v-else class="text-error font-semibold">✗ Out of Stock</p>

    <div class="flex flex-wrap gap-2 my-2">
        <span v-for="tag in product.tags" :key="tag" class="badge badge-outline">
        {{ tag }}
        </span>
    </div>

    <div class="card-actions mt-4">
        <button
        class="btn btn-primary btn-wide"
        :disabled="product.stock === 0"
        @click="handleBuy"
        >
        {{ product.stock === 0 ? 'Out of Stock' : 'Buy Now' }}
        </button>
    </div>
    </div>
</div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
product: { type: Object, required: true }
})

const emit = defineEmits(['buy'])

const discountedPrice = computed(() => {
if (props.product.discount === 0) return props.product.price
return (props.product.price * (1 - props.product.discount / 100)).toFixed(2)
})

function handleBuy() {
emit('buy', props.product.id)
}

onMounted(() => console.log(`ProductDetails mounted — ${props.product.name}`))
onUnmounted(() => console.log(`ProductDetails unmounted — ${props.product.name}`))
</script>