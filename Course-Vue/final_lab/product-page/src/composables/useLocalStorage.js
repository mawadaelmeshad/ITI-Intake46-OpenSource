import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {

const stored = localStorage.getItem(key)

const data = ref(
    stored ? JSON.parse(stored) : defaultValue
)

watch(
    data,
    (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
)

return data
}