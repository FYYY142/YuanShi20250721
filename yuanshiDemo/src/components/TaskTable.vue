<template>
  <div class="task-table">
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Overtime</th>
            <th>Hours</th>
            <th v-if="authStore.isAdmin()"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskStore.tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.project }}</td>
            <td>
              {{ task.overtime ? 'Yes' : 'No' }}
            </td>
            <td>{{ task.hours.toFixed(2) }}</td>
            <td v-if="authStore.isAdmin()">
              <button class="delete-btn" @click="handleDelete(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/tasks'

const authStore = useAuthStore()
const taskStore = useTaskStore()

const handleDelete = (id: string) => {
  if (confirm('确定要删除这条工单记录吗？')) {
    taskStore.deleteTask(id)
  }
}
</script>

<style scoped lang="less">
.task-table {
  margin-bottom: 2rem;
}

.task-table h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.table-container {
  overflow-x: auto;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.table th {
  background-color: #fafafa;
  font-weight: 600;
  color: #262626;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status.overtime {
  background-color: #fff2e8;
  color: #fa8c16;
}

.status.normal {
  background-color: #f6ffed;
  color: #52c41a;
}

.delete-btn {
  padding: 4px 12px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #ff7875;
}

.delete-btn:active {
  background-color: #d9363e;
}
</style>
