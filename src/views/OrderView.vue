<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../api';
import { useUserStore } from '../stores/user';

const store = useUserStore()

const orders = ref([])

onMounted(async () => {
    await api.get("/sanctum/csrf-cookie");
    const res = await api.get(`/api/orders/${store.user.id}`)

    orders.value = res.data.data
})
</script>

<template>
    <h2>我的預約：</h2>
    <ul>
        <div class="order" v-for="order of orders" :key="order.id">
            <h2>{{ order.name }}</h2>
            <h3>預約看房時間： {{ order.date }} {{ order.time.slice(0, 5) }}</h3>
            <span>預約時間： {{ order.created_at.split(' ')[0] }}</span>
        </div>
    </ul>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 0;
}

.order {
    padding: 2em;
    border: 1px solid #f1f1f1;
}
</style>