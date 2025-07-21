import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TaskItem } from '@/types'
import { mockTasks } from '@/mock/taskData'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<TaskItem[]>([...mockTasks])

  const deleteTask = (id: string) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  // 计算图表数据
  const chartData = computed(() => {
    const projectHours: Record<string, number> = {}

    tasks.value.forEach((task) => {
      if (projectHours[task.project]) {
        projectHours[task.project] += task.hours
      } else {
        projectHours[task.project] = task.hours
      }
    })

    return {
      projects: Object.keys(projectHours),
      hours: Object.values(projectHours),
    }
  })

  return {
    tasks,
    deleteTask,
    chartData,
  }
})
