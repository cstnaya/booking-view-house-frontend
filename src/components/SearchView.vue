<script setup>
import { api } from '../api';
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const cities = ref([])
const house_types = ref([])
const city_dists = computed(() => {
    const cid = query.value.city

    return cid > 0 && cities.value ?
        cities.value.find(c => c.id == cid).city_dists :
        []
})

// get metadata
onMounted(async () => {
    const res = await api.get("/api/house-infos")
    cities.value = res.data.data.cities
    house_types.value = res.data.data.house_types
})

const query = ref({
    keyword: "",
    city: "",
    city_dist: "",
    house_type: "",
    price_min: null,
    price_max: null,
    others: []
})

// price only can be int
watch(() => query.value.price_min, (newValue) => {
    if (isNaN(newValue)) {
        query.value.price_min = null
    }
    else if (newValue) {
        query.value.price_min = Math.round(+newValue)
    }
})

watch(() => query.value.price_max, (newValue) => {
    if (isNaN(newValue)) {
        query.value.price_max = null
    }
    else if (newValue) {
        query.value.price_max = Math.round(+newValue)
    }
})

const onSearch = async () => {
    // remove attribute w. "", null, undefined
    let formdata = Object.entries(query.value).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})

    // handle others
    if (formdata.others.length) {
        formdata.others = formdata.others.join(',')
    } else {
        delete formdata.others
    }

    if (JSON.stringify(formdata) !== "{}") {
        router.replace({ path: '/query', query: formdata })
    }
}

</script>

<template>
    <form @submit.prevent="onSearch">
        <div>
            關鍵字：
            <input type="search" v-model="query.keyword" />
        </div>
        <div>
            縣市：
            <select v-model="query.city">
                <option value="">不限</option>
                <option v-for="c of cities" :value="c.id" :key="c.id">{{ c.city }}</option>
            </select>
        </div>
        <div>
            鄉鎮市區：
            <select v-model="query.city_dist">
                <option value="">不限</option>
                <option v-for="c of city_dists" :key="c.id" :value="c.id">{{ c.dist_name }}</option>
            </select>
        </div>
        <div>
            房價區間：
            <input type="num" step="1" min="0" v-model="query.price_min" /> ~
            <input type="num" step="1" min="0" v-model="query.price_max" />
        </div>
        <div>
            房屋類型：
            <select v-model="query.house_type">
                <option value="">不限</option>
                <option v-for="h of house_types" :key="h.id" :value="h.id">{{ h.house_type }}</option>
            </select>
        </div>
        <div>
            <div>
                其他需求：
            </div>
            <label>
                <input type="checkbox" v-model="query.others" value="pet" />
                可寵物
            </label>
            <label>
                <input type="checkbox" v-model="query.others" value="cook" />
                可開伙
            </label>
            <label>
                <input type="checkbox" v-model="query.others" value="stop" />
                鄰近車站、捷運
            </label>
            <label>
                <input type="checkbox" v-model="query.others" value="parking" />
                附車位
            </label>
            <label>
                <input type="checkbox" v-model="query.others" value="elevator" />
                有電梯
            </label>
        </div>
        <button type="submit">Search!</button>
    </form>
</template>