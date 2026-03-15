<script setup>

import ProductCard from './ProductCard.vue'

const props = defineProps({
products: Array
})

</script>


<template>

<h2 class="text-2xl text-center  text-black font-bold mt-10 mb-4">
Related Products
</h2>

<div class="flex flex-wrap gap-6 mb-30 justify-center">

<ProductCard
v-for="item in products"
:key="item.id"
:item="item"
/>

</div>

</template>