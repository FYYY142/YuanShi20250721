<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'
import TaskTable from '@/components/TaskTable.vue'
import ProjectChart from '@/components/ProjectChart.vue'

const authStore = useAuthStore()
const isLoggedIn = ref(false)

const handleLoginSuccess = () => {
  isLoggedIn.value = true
}

const handleLogout = () => {
  authStore.logout()
  isLoggedIn.value = false
}
</script>

<template>
  <div class="app-container">
    <!-- 登录表单 -->
    <div v-if="!isLoggedIn" class="login-container">
      <LoginForm @login-success="handleLoginSuccess" />
    </div>

    <!-- 仪表盘 -->
    <div v-else class="dashboard">
      <header class="dashboard-header">
        <h1>Tasks</h1>
        <div class="user-info">
          <button class="logout-btn" @click="handleLogout">Logout</button>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="table-section">
          <TaskTable />
        </div>
        <div class="chart-section">
          <ProjectChart />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f2f5;
}

* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  padding: 1rem;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8e8e8;
}

.dashboard-header h1 {
  margin: 0;
  color: #1890ff;
  font-size: 1.8rem;
}

.logout-btn {
  padding: 6px 16px;
  background-color: #f5f5f5;
  color: #555;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.dashboard-content {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.table-section {
  flex: 3;
}

.chart-section {
  flex: 2;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .user-info {
    width: 100%;
    justify-content: space-between;
  }

  .dashboard-content {
    flex-direction: column;
  }
}
</style>
