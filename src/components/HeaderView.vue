<script setup>
import { useUserStore } from '../stores/user';

const store = useUserStore()

</script>

<template>
    <header>
        <h1>
            <router-link to="/">看房網</router-link>
        </h1>
        <span>輕鬆看房、租屋的好去處</span>

        <ul class="list">
            <div v-if="store.user.id">
                <router-link to="/create-house">
                    新增房屋
                </router-link>
            </div>
            <div v-if="store.user.id">
                <router-link to="/my-houses">
                    我的房屋
                </router-link>
            </div>
            <div v-if="store.user.id">
                <router-link to="/my-orders">
                    我的預約
                </router-link>
            </div>
            <div v-if="store.user.id">
                <router-link to="/user">
                    我的資料
                </router-link>
            </div>
            <div v-if="!store.user.id">
                <router-link to="/login">
                    登入
                </router-link>
            </div>
            <div v-if="!store.user.id">
                <router-link to="/register">
                    註冊
                </router-link>
            </div>
        </ul>
    </header>
</template>

<style scoped>
header {
    display: flex;
    gap: 1em;
    align-items: center;
}

.list {
    margin-left: auto;
    margin-right: 2em;
    display: flex;
    padding: 0;
    align-items: center;
    gap: 1em;
}
</style>