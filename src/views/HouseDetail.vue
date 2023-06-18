<script setup>
import { api } from '../api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter()

const userStore = useUserStore()
const route = useRoute()
const house = ref({})

const pet = computed(() => {
    return house.value.can_pet ? "可養寵物" : "不可養寵物"
})
const stop = computed(() => {
    return house.value.near_stop ? "近捷運、車站" : "交通較不便"
})
const parking = computed(() => {
    return house.value.has_parking ? "含車位" : "不含車位"
})
const cook = computed(() => {
    return house.value.can_cook ? "可開伙" : "不可開伙"
})
const elevator = computed(() => {
    return house.value.has_elevator ? "有電梯" : "無電梯"
})

onMounted(async () => {
    const res = await api.get(`/api/houses/${route.params.id}`)
    house.value = res.data.data
})


// reservation
const reservDate = ref(null)
const reservTime = ref(null)

const reservTimes = ref([])

const onChangeDate = async (e) => {
    reservDate.value = e.target.value

    // get valid dates
    const res = await api.get(`/api/houses-reservations?house=${house.value.id}&date=${e.target.value}`)
    reservTimes.value = res.data.data
}

const onReservation = async () => {
    if (!userStore.user.id) {
        alert("請先登入！")
    } else {
        try {
            const data = { customer_id: userStore.user.id, reservation_id: reservTime.value, date: reservDate.value }

            await api.get('/sanctum/csrf-cookie')
            await api.post("/api/orders", data)

            router.push({ path: "/my-orders" })
        } catch (e) {
            alert("發生錯誤，請稍後再試")
        }
    }
}
</script>

<template>
    <h1>{{ house.name }}</h1>
    <h2>租金： ${{ house.price }} / 月</h2>
    <div class="flex">
        <section class="house__detail">
            <div>
                地址：
                {{ house.city }} | {{ house.dist_name }}
                <div>
                    {{ house.address }}
                </div>
            </div>
            <div>
                房屋類型：
                {{ house.house_type }}
            </div>
            <div>
                居住條件：{{ pet }} | {{ cook }} | {{ parking }} | {{ stop }} | {{ elevator }}
            </div>
            <div>{{ house.description }}</div>
        </section>
        <section class="house__reserv">
            可租時段：
            <form @submit.prevent="onReservation">
                <input type="date" min="" :value="reservDate" @input="onChangeDate" required />
                <ul>
                    <li v-for="time of reservTimes" :key="time.id">
                        <label>
                            <input type="radio" v-model="reservTime" :value="time.id" :disabled="time.has_ordered" />
                            {{ time.time.slice(0, 5) }}
                            {{ time.has_ordered ? "(已被預約)" : "" }}
                        </label>
                    </li>
                </ul>
                <button type="submit" v-if="userStore.user.id !== house.owner_id">約看房</button>
            </form>
        </section>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 1em;
}

.house__detail {
    padding: 2em;
    flex: 3;
    box-shadow: 0 0 1px rgba(0, 0, 0, .12);
    border: 1px solid #f1f1f1;
}

.house__reserv {
    flex: 1;
    padding: 2em;
    box-shadow: 0 0 1px rgba(0, 0, 0, .12);
    border: 1px solid #f1f1f1;
}
</style>