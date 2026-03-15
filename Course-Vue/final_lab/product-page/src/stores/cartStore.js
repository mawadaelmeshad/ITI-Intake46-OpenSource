import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useProductStore } from './productStore'

export const useCartStore = defineStore('cart', () => {
    const items = useLocalStorage("cart", [])
    const productStore = useProductStore()

    const totalItems = computed(() =>
        items.value.reduce((sum, item) => sum + item.qty, 0)
    )

    const totalPrice = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
    )

    const addToCart = (product) => {
        const existing = items.value.find(i => i.id == product.id)
        if(existing){
            existing.qty++
        }
        else{
            items.value.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1
            })
        }
        productStore.decreaseStock(product.id)

    }

    const removeFromCart = (id) => {
        items.value = items.value.filter(i => i.id !== id)
        productStore.increaseStock(product.id)

    }

    const clearCart = () => {
        items.value.forEach(item => {
            productStore.increaseStock(item.id, item.qty) 
        })
        items.value = []
    }

    return {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart
    }

})