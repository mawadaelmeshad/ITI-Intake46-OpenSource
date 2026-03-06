<script setup>

import { ref } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import ProductDetails from './components/ProductDetails.vue'
import RelatedProducts from './components/RelatedProducts.vue'
import FooterComponent from './components/FooterComponent.vue'


const product = ref({
id: 1,
name: "Cozy Sneakers",
description: "High-quality sneakers that go with everything you wear.",
image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
badge: "NEW",
price: 120,
discount: 20,
tags: ["Fashion", "Casual", "Sport"],
isAvailable: true
})

const relatedProducts = ref([
{
id: 2,
name: "Running Shoes",
price: 90,
discount: 10,
image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
},
{
id: 3,
name: "Casual Boots",
price: 150,
discount: 0,
image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
},
{
id: 4,
name: "Flip Flops",
price: 30,
discount: 50,
image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
}
])

</script>


<template>
<div class="bg-white min-h-[80vh] overflow-y-auto">


<HeaderComponent />

<div class="container mx-auto p-10  ">

<ProductDetails :product="product" />

<RelatedProducts :products="relatedProducts" />

</div>

<FooterComponent />
</div>

</template>