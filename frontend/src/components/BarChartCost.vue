<template>
  <div class="project-list">
    <ul>
      <li v-for="project in projects" :key="project.id" @click="selectProject(project.id)">
        {{ project.name }}
      </li>
    </ul>
  </div>
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
    chartData: {
      labels: ['Project1', 'P2', 'P3'],
      datasets: [
        {
          label: 'COST',
          backgroundColor: '#f87979',
          data: [40, 20, 12],
        },
      ],
    },
  }),
  async mounted() {
    this.loaded = false

    try {
      const { userlist } = await fetch('/api/userlist')
      this.chartdata = userlist

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    handleClick(evt, activeElements) {
      if (activeElements.length) {
        const chart = this.$refs.chart.chart
        const index = activeElements[0].index
        const datasetLabel = chart.data.datasets[activeElements[0].datasetIndex].label
        console.log(`Vous avez cliqué sur la barre ${index} du graphique "${datasetLabel}"`)
      }
    },
    async selectProject(projectId) {
      try {
        console.log("ok")
        const { userlist } = await fetch(`/api/project/${projectId}/users`)
        const userData = userlist.map(user => ({
          label: user.name,
          data: [user.hoursWorked],
        }))
        this.chartData = {
          labels: ['User1', 'User2', 'User3'],
          datasets: userData,
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
