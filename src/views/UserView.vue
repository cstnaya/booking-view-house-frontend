<script setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '../api'
import { useUserStore } from '../stores/user.js'

const store = useUserStore()

const user = ref({})

// 按重整時要有這段才能顯示資料
watch(() => store.user, () => {
    user.value = store.user
})

onMounted(async () => {
    // await api.get('/sanctum/csrf-cookie')
    // const res = await api.get('/api/user')

    // user.value.email = res.data.email
    // user.value.name = res.data.name
    user.value = store.user
})
</script>

<template>
    <h2>我的資料</h2>
    <div>user name: {{ user.name }}</div>
    <div>user email: {{ user.email }}</div>
</template>