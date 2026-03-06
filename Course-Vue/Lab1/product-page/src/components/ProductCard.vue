
<script setup>
import { computed } from 'vue'

const props = defineProps({
item:{type:Object, required:true}
})

const discountedPrice = computed(() => {
return props.item.price - (props.item.price * props.item.discount / 100)
})
</script>

<template>

<div class="card w-80 bg-base-100 shadow-sm">
<div class="card-body">
    <span class="badge badge-xs badge-warning">Most Popular</span>
    <div class="flex justify-between">
    <h2 class="text-3xl font-bold">{{item.name}}</h2>
    <div>
        <span
        v-if="item.discount > 0"
        class="line-through text-gray-400"
        >
        ${{ item.price }}
        </span>

        <span class="text-primary font-bold ml-2">
        ${{ discountedPrice }}
        </span>

    </div>
    </div>
    <ul class="mt-6 flex flex-col gap-2 text-xs">
    <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>High-resolution image generation</span>
    </li>
    <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Customizable style templates</span>
    </li>
    <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>Batch processing capabilities</span>
    </li>
    <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span>AI-driven image enhancements</span>
    </li>
    <li class="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span class="line-through">Seamless cloud integration</span>
    </li>
    <li class="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        <span class="line-through">Real-time collaboration tools</span>
    </li>
    </ul>
    <div class="mt-6">
    <button class="btn btn-primary btn-block">Buy</button>
    </div>
</div>
</div>

</template>