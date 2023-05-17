<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChartTime',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
    chartOptions: {
      onClick: (event, elements) => {
        if (elements.length != 0) {
            var position = elements[0].index;
            
            console.log(this.chartData);
        } else {
            console.log("You selected the background!");            
        }  

      }
    },
    //example para ti
    
  }),
  
  async mounted () {
    this.loaded = false

    try {
      const response = await axios.get('http://localhost:3000/tiempos/consultas?tipo=proyecto');
      //const { userlist } = await fetch('/api/project');
      //you need to replace by project list
      console.log(response);
      let ids=[];
      let labels=[];
      let tiempo=[];
      for(var i in response.data){
        console.log(response.data[i]);
        ids.push(response.data[i].id);
        labels.push(response.data[i].nombre);
        tiempo.push(response.data[i].tiempo);
      }
      console.log(labels);
      this.chartData = {
        ids: ids,
        labels: labels,
        datasets: [
          {
            label: 'Time in hours',
            backgroundColor: '#f87967',
            data: tiempo
          }
        ]
      }

      this.chartOptions = {
      onClick: async (event, elements) => {
        if (elements.length != 0) {
            var position = elements[0].index;
            var label_clicked = this.chartData.labels[position]
            try {
              const response = await axios.get('http://localhost:3000/tiempos/consultas?tipo=usuario&id_proyecto='+ this.chartData.ids[position]);
      //const { userlist } = await fetch('/api/project');
      //you need to replace by project list
              console.log(response);
              let labels=[];
              let tiempo=[];
              for(var i in response.data){
                console.log(response.data[i]);
                labels.push(response.data[i].nombre);
                tiempo.push(response.data[i].tiempo);
              }
              console.log(labels);
              this.chartData = {
                labels: labels,
                datasets: [
                  {
                    label: 'Time in hours',
                    backgroundColor: '#f87967',
                    data: tiempo
                  }
                ]
              }


              }catch(e){
                console.error(e)
              }
            }
           else {
            console.log("You selected the background!");            
        }  

      }
    },

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}

</script>