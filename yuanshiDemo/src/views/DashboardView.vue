<template>
  <div class="dashboard">
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
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TaskTable from '@/components/TaskTable.vue'
import ProjectChart from '@/components/ProjectChart.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  // 检查是否已登录
  if (!authStore.isLoggedIn) {
    router.push('/login')
  }
})
</script>

<style scoped lang="less">
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
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

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: #555;
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
