import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../composables/useApi'

export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const api = useApi("http://localhost:3000/products")

    const fetchProducts  = async() => {
        await api.getAll()
        products.value = api.data.value
    }

    const decreaseStock = async (id) => {
        const product = products.value.find(p => p.id == id)
        if(product && product.stock > 0){
            product.stock--
            await api.update(id, product)
        }
    }

    const increaseStock = async (id) => {
        const product = products.value.find(p => p.id === id)
        if(product){
            product.stock++;
            await api.update(id, product)
        }
    }

    const getProductById = (id) => {
        return products.value.find(p => p.id == id)
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        decreaseStock,
        increaseStock,
        getProductById
    }

})