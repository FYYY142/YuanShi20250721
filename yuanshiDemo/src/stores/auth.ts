import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  const login = (username: string, password: string) => {
    // 简单的登录逻辑
    if (username && password) {
      const role = username === 'admin' ? 'admin' : 'user'
      user.value = { username, role }
      isLoggedIn.value = true
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
  }

  const isAdmin = () => {
    return user.value?.role === 'admin'
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    isAdmin,
  }
})
