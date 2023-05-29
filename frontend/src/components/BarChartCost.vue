<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    let url = 'http://localhost:3000/tiempos/consultas?tipo=proyecto';
    if(user.rol=='user'){
      url +='&id_usuario='+user.id;
    }
    try {
      let response = await axios.get(url);
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
        onClick: async(event, elements) => {
          if (elements.length != 0) {
            var position = elements[0].index;
            var label_clicked = this.chartData.labels[position];
            console.log(this.chartData.ids[position]);
            let url = 'http://localhost:3000/tiempos/consultas?tipo=usuario&id_proyecto='+ this.chartData.ids[position];
            if(user.rol=='user'){
              url +='&id_usuario='+user.id;
            }
            try {
              let response = await axios.get(url);
              console.log(response,this.id);
            
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
                    label: label_clicked,
                    backgroundColor: '#f877',
                    data: costos
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