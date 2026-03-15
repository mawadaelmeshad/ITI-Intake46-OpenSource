import {ref} from 'vue'

export function useApi(baseurl){
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const getAll = async () => {
        loading.value = true

        try{
            const res = await fetch(baseurl)
            data.value = await res.json()
        }
        catch(err){
            error.value = err.message
        }
        finally{
            loading.value = false
        }

    }

    const getOne = async (id) =>{
        loading.value = true
        try {
            const res = await fetch(`${baseurl}/${id}`)
            data.value = await res.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const update = async (id, obj) => {
        loading.value = true
        try {
            const res = await fetch(`${baseurl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
            })
            data.value = await res.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return {
        data,
        loading,
        error,
        getAll,
        getOne,
        update
    }

}