<script setup>
import { ref } from 'vue';
import { api } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const onRegister = async () => {
  await api.get('/sanctum/csrf-cookie')
  await api.post('/api/register', form.value)
  await api.post('/api/login', { email: form.value.email, password: form.value.password, remember: true })

  router.replace({ name: "user-info" })
}
</script>

<template>
  <main>
    <h1>login</h1>
    <form @submit.prevent="onRegister">
      <div>
        <input type="text" v-model="form.name" placeholder="input name here..." required />
      </div>
      <div>
        <input type="email" v-model="form.email" placeholder="input email here..." required />
      </div>
      <div>
        <input type="password" v-model="form.password" placeholder="input password here..." required />
      </div>
      <div>
        <input type="password" v-model="form.password_confirmation" placeholder="input password again here..." required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </main>
</template>