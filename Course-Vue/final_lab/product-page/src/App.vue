<script setup>


import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'





</script>


<template>
<div class="bg-white min-h-[80vh] overflow-y-auto">


<HeaderComponent/>

<div class="container mx-auto p-10  ">

<RouterView
/>

</div>

<FooterComponent />
</div>

</template>