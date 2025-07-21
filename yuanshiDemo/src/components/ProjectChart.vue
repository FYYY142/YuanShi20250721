<template>
  <div class="chart-container">
    <h3>Project Hours Distribution</h3>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

const taskStore = useTaskStore()
const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    updateChart()
  }
}

// 更新图表数据
const updateChart = () => {
  if (!chart) return

  const { projects, hours } = taskStore.chartData

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: projects,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Hours',
    },
    series: [
      {
        name: 'Hours',
        type: 'bar',
        barWidth: '60%',
        data: hours,
        itemStyle: {
          color: '#1890ff',
        },
      },
    ],
  }

  chart.setOption(option)
}

// 监听窗口大小变化
const handleResize = () => {
  chart?.resize()
}

// 监听任务数据变化
watch(
  () => taskStore.chartData,
  () => {
    updateChart()
  },
  { deep: true },
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="less">
.chart-container {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8e8e8;
}

.chart-container h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.chart {
  height: 400px;
  width: 100%;
}
</style>
