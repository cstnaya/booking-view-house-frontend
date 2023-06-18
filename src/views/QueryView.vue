<script setup>
import { api } from '../api';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import HouseList from '../components/HouseList.vue';

const route = useRoute()

const houses = ref([])


// search for result
onMounted(async () => {
    const query = Object.entries(route.query).reduce((str, [k, v]) => str + `${k}=${v}&`, "?")

    const res = await api.get(`/api/houses${query}`)
    console.log(res.data.data)

    houses.value = res.data.data
})

</script>

<template>
    <h2>搜尋結果</h2>
    <HouseList :houses="houses" />
</template>