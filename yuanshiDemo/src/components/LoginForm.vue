<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input id="username" v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input id="password" v-model="password" type="password" placeholder="Password" required />
      </div>
      <button type="submit" class="login-btn">Log in</button>
    </form>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['login-success'])
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    emit('login-success')
  } else {
    errorMessage.value = '登录失败，请检查用户名和密码'
  }
}
</script>

<style scoped lang="less">
.login-form {
  background: white;
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.login-btn {
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 1rem auto;
  padding: 0.75rem;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #e0e0e0;
}

.error-message {
  color: #ff4d4f;
  text-align: center;
  margin-top: 1rem;
}
</style>
