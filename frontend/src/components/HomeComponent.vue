<template>
  <div>
    <h1>{{ username }}'s Dashboard</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="m-0 proyectos-title"></h2>
          <div>
            <button class="btn btn-primary me-2" @click="createProject">Crear proyecto</button>
            <button v-if="isAdmin" class="btn btn-primary" @click="viewClients">Ver Clientes</button>
            <button class="btn btn-primary" @click="projectStats">Project Stats</button>
          </div>
        </div>
        <div v-if="projects.length > 0" class="card">
          <div class="card-body">
            <div v-for="(project, index) in projects" :key="index">
              <h5 class="card-title">{{ project.nombre }}</h5>
              <p class="card-text">{{ project.descripcion }}</p>
              <a :href="`/tasksuser/${project.id}`" class="btn btn-primary">Ver Proyecto</a>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No se encontraron proyectos.</p>
        </div>
      </div>
      <div class="col-md-6">
        <h2>Actividad Reciente</h2>
        <div v-if="activity.length > 0" class="card">
          <div class="card-body">
            <div v-for="(item, index) in activity" :key="index">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.description }}</p>
              <p class="card-text"><small class="text-muted">{{ formatDate(item.date) }}</small></p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No se encontró actividad reciente.</p>
        </div>
      </div>
    </div>
  </div>
</template>



  
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';
  import { userInfo } from "os";
  import axios from 'axios';


  
  export default defineComponent({
    name: "HomePage",
    setup(){
      const userCookie = Cookies.get('user');
      const user = userCookie ? JSON.parse(userCookie) : null;

      let isAdmin = false;
      let username = "Usuario";

      if (user){
        username= user.nombre;
      } 

      if (user && user.rol === 'admin') {
        isAdmin = true;
      }
      const router = useRouter()
      const createProject = () => {
        router.push('/CreateProject') // redirige vers la page '/register'
      }
      const viewClients = () => {
        router.push('/SeeClient') // redirige vers la page '/ViewClients'
      }
      const projectStats = () => {
        router.push('/ProjectCharts') // redirige vers la page '/ProjectStats'
      }
      // Récupère la valeur de l'utilisateur connecté depuis le cookie et détermine s'il est admin
      return { createProject, viewClients,projectStats, isAdmin, username}
    },
    data() {
      return {
        projects: [
          {
            id: 1,
            nombre: "Project 1",
            descripcion: "This is a description for Project 1.",
          },
          {
            id: 2,
            nombre: "Project 2",
            descripcion: "This is a description for Project 2.",
          },
          {
            id: 3,
            nombre: "Project 3",
            descripcion: "This is a description for Project 3.",
          },
        ],
        activity: [
          {
            title: "Project 1 updated",
            description: "Project 1 status updated to 'In progress'",
            date: "2023-04-18",
          },
          {
            title: "New task added to Project 3",
            description: "Task 'Design homepage' added to Project 3",
            date: "2023-04-17",
          },
          {
            title: "Task completed in Project 2",
            description: "Task 'Implement login functionality' completed in Project 2",
            date: "2023-04-16",
          },
        ],
      };
    },
    created: async function(){
      const userCookie = Cookies.get('user');
      const user = userCookie ? JSON.parse(userCookie) : null;
      console.log('Ver si llega');
      try {
        // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
        const response = await axios.get('http://localhost:3000/proyectos/?id_usuario='+user.id);
        console.log(response);
        console.log(response.data);
        this.projects=response.data;
      } catch (error) {
        console.error(error);
      }

    },
    methods: {
      formatDate(date: string) {
        const options = { year: "2-digit", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined);
      },
    },
  });
  </script>
  

  

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: center;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.project {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
}

.project-status {
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.activity-list {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.proyectos-title {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.btn {
  margin-left: 10px;
}

.activity {
  margin: 10px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 10px;
}
</style>
