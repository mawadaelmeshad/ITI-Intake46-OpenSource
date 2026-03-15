<script setup>

import { ref, computed } from 'vue'

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


const products = ref([
{
    id: 1,
    name: "Cozy Sneakers",
    description: "High-quality sneakers that go with everything you wear.",
    image: "https://tse4.mm.bing.net/th/id/OIP.EBDSSSNhj2aBdei91MU78AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "NEW",
    price: 120,
    discount: 20,
    stock: 1,
    tags: ["Fashion", "Casual", "Sport"]
},
{
    id: 2,
    name: "Running Shoes",
    description: "Built for speed and comfort on any terrain.",
    image: "https://tse4.mm.bing.net/th/id/OIP.EBDSSSNhj2aBdei91MU78AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "",
    price: 90,
    discount: 10,
    stock: 2,
    tags: ["Sport", "Running"]
},
{
    id: 3,
    name: "Casual Boots",
    description: "Rugged boots for everyday adventures.",
    image: "https://tse4.mm.bing.net/th/id/OIP.EBDSSSNhj2aBdei91MU78AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "SALE",
    price: 150,
    discount: 0,
    stock: 2,
    tags: ["Casual", "Winter"]
},
{
    id: 4,
    name: "Flip Flops",
    description: "Light and breezy for sunny days.",
    image: "https://tse4.mm.bing.net/th/id/OIP.EBDSSSNhj2aBdei91MU78AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "",
    price: 30,
    discount: 50,
    stock: 4,
    tags: ["Summer", "Casual"]
}
])

function handleBuy(id){
    const product = products.value.find(p => p.id === id)

    if(product && product.stock > 0){

    product.stock--

    }
}

const totalStock = computed(() =>
    products.value.reduce((sum, p) => sum + p.stock, 0)
)



</script>


<template>
<div class="bg-white min-h-[80vh] overflow-y-auto">


<HeaderComponent :totalStock="totalStock"/>

<div class="container mx-auto p-10  ">

<RouterView
:products="products"
@buy="handleBuy"
/>

</div>

<FooterComponent />
</div>

</template>