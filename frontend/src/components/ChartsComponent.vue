<template>
  <div class="chart-container">
    <BarChartCost />
    <BarChartTime />
  </div>
</template>

<script>
import BarChartCost from '@/components/BarChartCost'
import BarChartTime from '@/components/BarChartTime'

export default {
  name: 'ChartsComponent',
  components: { BarChartCost,BarChartTime }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
}
</style>
