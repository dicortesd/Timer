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
      let costos=[];
      for(var i in response.data){
        console.log(response.data[i]);
        ids.push(response.data[i].id);
        labels.push(response.data[i].nombre);
        costos.push(response.data[i].costo);
      }

      this.chartData = {
        ids: ids,
        labels: labels,
        datasets: [
          {
            label: 'Cost',
            backgroundColor: '#078698 ',
            data: costos
          }
        ]
      }

      this.chartOptions = {
        onClick: (event, elements) => {
          if (elements.length != 0) {
            var position = elements[0].index;
            var label_clicked = this.chartData.labels[position];
            console.log(this.chartData.ids[position]);
            try {
              //const { project  } = await fetch('/api/'+label_clicked)
              this.chartData = {
                labels: [ 'Client1', 'Client2', 'Client3'],
                datasets: [
                  {
                    label: label_clicked,
                    backgroundColor: '#f877',
                    data: [40, 20, 12]
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