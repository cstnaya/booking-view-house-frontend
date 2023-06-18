<script setup>
import { ref } from 'vue';
import { api } from '../api.js'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter()
const store = useUserStore()

const form = ref({
  email: '',
  password: '',
  remember: true
})

const onLogin = async () => {
  await api.get('/sanctum/csrf-cookie')
  await api.post('/api/login', form.value)

  const res = await api.get("/api/user")
  store.user = res.data

  router.replace({ name: "user-info" })
}

</script>

<template>
  <main>
    <h1>login</h1>
    <form @submit.prevent="onLogin">
      <div>
        <input type="email" v-model="form.email" placeholder="input email here..." required />
      </div>
      <div>
        <input type="password" v-model="form.password" placeholder="input password here..." required />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  </main>
</template>
