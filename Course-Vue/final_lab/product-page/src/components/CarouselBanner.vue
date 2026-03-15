<template>
<div class="carousel w-full">
    <div id="slide1" class="carousel-item relative w-full">
    <img
        src="https://tse1.mm.bing.net/th/id/OIP.HTPCXU0TOFrfyfqdBkHXsAHaFE?rs=1&pid=ImgDetMain&o=7&rm=3"
        class="w-full object-cover h-90"
    />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" class="btn btn-circle">❮</a>
        <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
    </div>

    <div id="slide2" class="carousel-item relative w-full">
    <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20220211/pngtree-fashion-leather-shoes-fashioned-black-used-photo-image_15910540.jpg"
        class="w-full object-cover h-90"
    />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" class="btn btn-circle">❮</a>
        <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
    </div>

    <div id="slide3" class="carousel-item relative w-full">
    <img
        src="https://img.freepik.com/premium-photo/blue-shoes_1037171-12507.jpg"
        class="w-full object-cover h-90"
    />
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide2" class="btn btn-circle">❮</a>
        <a href="#slide1" class="btn btn-circle">❯</a>
    </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => console.log('CarouselBanner mounted'))
onUnmounted(() => console.log('CarouselBanner unmounted'))
</script>