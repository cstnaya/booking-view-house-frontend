<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../api'

const user = ref({
    email: '',
    name: ''
})

onMounted(async () => {
    await api.get('/sanctum/csrf-cookie')
    const res = await api.get('/api/user')

    user.value.email = res.data.email
    user.value.name = res.data.name
})
</script>

<template>
    <h1>here is user info page</h1>
    <div>user name: {{ user.name }}</div>
    <div>user email: {{ user.email }}</div>
</template>