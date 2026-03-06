<script setup>

import { computed } from 'vue'

const props = defineProps({
product: Object
})

const discountedPrice = computed(() => {
return props.product.price - (props.product.price * props.product.discount / 100)
})

</script>


<template>

<div class="card lg:card-side bg-base-100 shadow-xl max-w-3/4 mx-auto">

<figure>
<img :src="product.image" class="w-full lg:w-80">
</figure>

<div class="card-body">

<h2 class="card-title">

{{ product.name }}

<span
v-if="product.badge"
class="badge badge-secondary"
>
{{ product.badge }}
</span>

</h2>

<p>{{ product.description }}</p>

<div>

<span
v-if="product.discount > 0"
class="line-through text-gray-400"
>
${{ product.price }}
</span>

<span class="text-primary font-bold ml-2">
${{ discountedPrice }}
</span>

</div>

<div>

<span
v-for="tag in product.tags"
:key="tag"
class="badge badge-outline mr-2"
>

{{ tag }}

</span>

</div>

<span
    v-if="!product.isAvailable"
    class="badge badge-error"
    >
    Out of Stock
</span>

<button
    class="btn btn-primary mt-3"
    :disabled="!product.isAvailable"
    >
    Buy Now
</button>

</div>

</div>

</template>