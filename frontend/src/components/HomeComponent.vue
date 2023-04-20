<template>
    <div>
      <h1>{{ username }}'s Dashboard</h1>
      <div class="row">
        <div class="col-md-6">
            <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="m-0 proyectos-title">Proyectos</h2>
    <button class="btn btn-primary" @click="createProject">Crear proyecto</button>
  </div>
          <div v-if="projects.length > 0" class="card">
            <div class="card-body">
              <div v-for="(project, index) in projects" :key="index">
                <h5 class="card-title">{{ project.name }}</h5>
                <p class="card-text">{{ project.description }}</p>
                <a :href="`/projects/${project.id}`" class="btn btn-primary">Ver Proyecto</a>
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
  
  export default defineComponent({
    name: "HomePage",
    setup(){

        const router = useRouter()
        const createProject = () => {
        router.push('/CreateProject') // redirige vers la page '/register'
      }

      return{createProject}
    },
    data() {
      return {
        username: "John Doe",
        projects: [
          {
            id: 1,
            name: "Project 1",
            description: "This is a description for Project 1.",
          },
          {
            id: 2,
            name: "Project 2",
            description: "This is a description for Project 2.",
          },
          {
            id: 3,
            name: "Project 3",
            description: "This is a description for Project 3.",
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
