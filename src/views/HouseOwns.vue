<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../api';
import { useUserStore } from '../stores/user';
import HouseList from '../components/HouseList.vue';

const store = useUserStore()

const houses = ref([])

onMounted(async () => {
    const owner_id = store.user.id

    await api.get("/sanctum/csrf-cookie");
    const res = await api.get(`/api/users/${owner_id}/houses`);

    houses.value = res.data.data
})
</script>

<template>
    <h1>我的房子：</h1>
    <HouseList :houses="houses" />
</template>