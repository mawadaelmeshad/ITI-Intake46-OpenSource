<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
<div class="container text-black mx-auto px-6 py-8">

<h1 class="text-3xl font-bold mb-6">Your Cart</h1>

<div v-if="cartStore.items.length === 0" class="text-center py-10">
<p class="text-gray-900 text-lg">Your cart is empty</p>
<RouterLink to="/" class="btn btn-primary mt-4">
Continue Shopping
</RouterLink>
</div>

<div v-else>

<table class="table w-full">

<thead>
<tr class="text-black">
<th>Product</th>
<th>Price</th>
<th>Quantity</th>
<th>Subtotal</th>
<th></th>
</tr>
</thead>

<tbody>

<tr v-for="item in cartStore.items" :key="item.id">

<td class="font-semibold">
{{ item.name }}
</td>

<td>
${{ item.price }}
</td>

<td>
{{ item.qty }}
</td>

<td>
${{ item.price * item.qty }}
</td>

<td>
<button
class="btn btn-error btn-sm"
@click="cartStore.removeFromCart(item.id)"
>
Remove 🗑️
</button>
</td>

</tr>

</tbody>

</table>


<div class="mt-8 text-right">

<h2 class="text-2xl font-bold">
Total: ${{ cartStore.totalPrice }}
</h2>

<button
class="btn btn-success mt-4"
@click="cartStore.clearCart"
>
Clear Cart
</button>

</div>

</div>

</div>
</template>