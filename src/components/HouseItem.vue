<script setup>
const prop = defineProps(['house'])
</script>

<template>
    <section class="house__item">
        <h2>{{ house.name }}</h2>
        <div>地址：{{ house.city }} | {{ house.dist_name }}</div>
        <div>房屋類型：{{ house.house_type }}</div>
        <div>月租：{{ house.price }}</div>
        <div>
            <router-link :to="`/house/${house.id}`">看詳細</router-link>
        </div>
    </section>
</template>

<style scoped>
.house__item {
    padding: 2em;
    border: 1px solid #f1f1f1;
    box-shadow: 0 0 1px rgba(0, 0, 0, .12);
}

.house__item+.house__item {
    margin-top: 2.5em;
}
</style>