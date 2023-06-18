<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { api } from '../api';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()

const cities = ref([])
const house_types = ref([])
const city_dists = computed(() => {
    const cid = form.value.city_id

    return cid > 0 && cities.value ?
        cities.value.find(c => c.id == cid).city_dists :
        []
})

const shortest_rent_times = ref(
    ["一個月", "兩個月", "三個月", "四個月", "五個月", "半年", "一年", "兩年", "三年"]
)

// get metadata
onMounted(async () => {
    const res = await api.get("/api/house-infos")
    cities.value = res.data.data.cities
    house_types.value = res.data.data.house_types
})

const form = ref({
    name: null,
    price: null,
    size: null,
    shortest_rent_time: "",
    house_type_id: "",
    description: null,
    city_id: "",
    city_dist_id: "",
    address: null,
    can_cook: false,
    can_pet: false,
    near_stop: false,
    has_parking: false,
    has_elevator: false,
    reservations: [null],
})

watch(() => form.value.price, (newValue) => {
    if (isNaN(newValue)) {
        form.value.price = null
    }
    else if (newValue) {
        form.value.price = Math.round(+newValue)
    }
})
watch(() => form.value.size, (newValue) => {
    if (isNaN(newValue)) {
        form.value.size = null
    }
    else if (newValue) {
        form.value.size = Math.round(+newValue)
    }
})

const addTime = () => {
    form.value.reservations.push(null)
}

const changeTime = (index) => {
    form.value.reservations[index] = event.target.value
}

const onSubmit = async () => {
    const store = useUserStore()

    const formData = Object.assign({}, form.value)
    formData.owner_id = store.user.id

    // TODO: duplicated timezone in reserv

    await api.get("/sanctum/csrf-cookie");
    await api.post("/api/houses", formData)

    router.push({ path: "/my-houses" })
}
</script>

<template>
    <h1>新增房屋</h1>
    <form @submit.prevent="onSubmit">
        <div>
            <span class='required'>房屋名稱：</span>
            <input type="text" v-model="form.name" required />
        </div>
        <div>
            <span class='required'>房型：</span>
            <select v-model="form.house_type_id" required>
                <option value="" disabled>請選擇...</option>
                <option v-for="h of house_types" :key="h.id" :value="h.id">{{ h.house_type }}</option>
            </select>
        </div>
        <div>
            <span class='required'>租金（月）：</span>
            <input type="number" v-model="form.price" required />
        </div>
        <div>
            坪數：
            <input type="number" v-model="form.size" />
        </div>
        <div>
            <span class='required'>最短租期：</span>
            <select v-model="form.shortest_rent_time" required>
                <option value="" disabled>請選擇...</option>
                <option v-for="period of shortest_rent_times" :value="period" :key="period">{{ period }}
                </option>
            </select>
        </div>
        <div>
            <span class='required'>所居縣市：</span>
            <select v-model="form.city_id" required>
                <option value="" disabled>請選擇...</option>
                <option v-for="c of cities" :value="c.id" :key="c.id">{{ c.city }}</option>
            </select>
        </div>
        <div>
            <span class='required'>所居鄉鎮市區：</span>
            <select v-model="form.city_dist_id" required>
                <option value="" disabled>請選擇...</option>
                <option v-for="c of city_dists" :key="c.id" :value="c.id">{{ c.dist_name }}</option>
            </select>
        </div>
        <div>
            <span class='required'>完整地址：</span>
            <input type="text" v-model="form.address" required />
        </div>
        <div>
            其他條件：
            <label>
                <input type="checkbox" v-model="form.can_cook" />
                可開伙
            </label>
            <label>
                <input type="checkbox" v-model="form.can_pet" />
                可養寵物
            </label>
            <label>
                <input type="checkbox" v-model="form.near_stop" />
                鄰近車站、捷運
            </label>
            <label>
                <input type="checkbox" v-model="form.has_parking" />
                附車位
            </label>
            <label>
                <input type="checkbox" v-model="form.has_elevator" />
                有電梯
            </label>
        </div>
        <div>
            可約看房時段：
            <div class="time-periods">
                <input type="time" v-for="(time, idx) of form.reservations" :key="`${time}-${Math.round()}`" :value="time"
                    @input="changeTime(idx)" />
                <button type="button" @click.prevent="addTime">新增時段</button>
            </div>
        </div>
        <div class="flex-col">
            <span>房屋描述：</span>
            <textarea type="text" v-model="form.description" rows="20"></textarea>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
</template>

<style scoped>
.required::before {
    content: "* ";
    color: red;
}

.flex-col {
    display: flex;
    flex-direction: column;
    padding: 0.5em 0;
}

textarea {
    box-sizing: border-box;
    padding: 1em;
}

.time-periods {
    display: flex;
    align-items: center;
    gap: 1em;
}
</style>