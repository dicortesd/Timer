<template>
    <div>
      <h1>{{ projectName }}</h1>
      <div class="task-container">
        <div class="task-box">
          <h2>A faire</h2>
          <div class="task-list">
            <div v-for="(task, index) in tasksToDo" :key="index" class="task">
              {{ task.name }}
            </div>
          </div>
        </div>
        <div class="task-box">
          <h2>En cours</h2>
          <div class="task-list">
            <div v-for="(task, index) in tasksInProgress" :key="index" class="task">
              {{ task.name }}
            </div>
          </div>
        </div>
        <div class="task-box">
          <h2>Terminées</h2>
          <div class="task-list">
            <div v-for="(task, index) in tasksDone" :key="index" class="task">
              {{ task.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "TaskManagement",
    data() {
      return {
        projectName: "Nom du projet",
        tasksToDo: [] as any[],
        tasksInProgress: [] as any[],
        tasksDone: [] as any[],
      };
    },
    created: async function(){
      try {
        // Connexion au backend pour récupérer les données des tâches du projet
        const response = await axios.get('http://localhost:3000/tareas/?projectID='+this.$route.params.id);
        const tasks = response.data;
        
        // Répartir les tâches dans les 3 états
        tasks.forEach((task: any) => {
          if (task.state === "toDo") {
            this.tasksToDo.push(task);
          } else if (task.state === "inProgress") {
            this.tasksInProgress.push(task);
          } else if (task.state === "done") {
            this.tasksDone.push(task);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
  </script>
  
  <style scoped>
  .task-container {
    display: flex;
    justify-content: center;
  }
  
  .task-box {
    margin: 20px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
    max-width: 400px;
  }
  
  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .task {
    margin: 10px;
    padding: 10px;
    background-color: #ddd;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
    cursor: pointer;
  }
  </style>
  