<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChartCost',
  components: { Bar },
  data: () => ({
    loaded: false,
    //example para ti
    chartData: {
        labels: [ 'Project1', 'P2', 'P3'],
        datasets: [
          {
            label: 'Time',
            backgroundColor: '#f87967',
            data: [40, 20, 12]
          }
        ]
      }
  }),
  async mounted () {
    this.loaded = false

    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>