<script setup>
import HouseItem from './HouseItem.vue';

const props = defineProps(['houses'])
</script>

<template>
    <ul>
        <HouseItem v-for="house of houses" :house="house" :key="house.id" />
    </ul>
</template>

<style scoped>
ul {
    padding: 0 1em;
}
</style>