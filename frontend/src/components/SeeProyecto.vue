<template>
    <div>
      <h1>{{ projectName }} {{ id }}</h1>
      <button type="button" @click="showForm = true">Añadir Tarea</button>
      <div v-if="showForm">
        <form @submit.prevent="addTask">
          <label for="taskName">Nombre de la tarea :</label>
          <input type="text" id="taskName" v-model="newTask.name" required />
          <label for="taskCategory">Categoria :</label>
          <input type="text" id="taskCategory" v-model="newTask.category" required />
          <label for="taskDetails">Observaciones :</label>
          <textarea id="taskDetails" v-model="newTask.details" required></textarea>
          <button type="submit">Añadir</button>
        </form>
      </div>
      <div class="box-container">
        <div class="box">
          <h2>Usuarios</h2>
          <div class="square-container">
            <div v-for="(participant, index) in participants" :key="index" class="square">
              {{ participant }}
            </div>
          </div>
        </div>
        <div class="box">
          <h2>Tareas</h2>
          <div v-for="(task, index) in tasks" :key="index" class="task">
            <div class="task-name">{{ task.name }}</div>
            <div class="task-category">{{ task.category }}</div>
            <div class="task-details">{{ task.details }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from "vue";
  
  interface Task {
    name: string;
    category: string;
    details: string;
  }
  
  export default defineComponent({
    name: "ProjectDetails",
    setup(){
      //console.log(this.$route.params.id);
    },
    data() {
      return {
        projectName: "Projet 1A",
        participants: ["Participant 1", "Participant 2", "Participant 3"],
        tasks: [] as Task[],
        showForm: false,
        newTask: {
          name: "",
          category: "",
          details: "",
        },
        id: this.$route.params.id
      };
    },

    created: async function(){
    console.log('Ver si llega');
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/usuarios/');
      console.log(response);
      console.log(response.data);
      this.participants=response.data;
    } catch (error) {
      console.error(error);
    }
  },

    methods: {
      addTask() {
        console.log(this.id);
        this.tasks.push({ ...this.newTask });
        this.newTask.name = "";
        this.newTask.category = "";
        this.newTask.details = "";
        this.showForm = false;
      },
      deleteTask(index: number) {
        this.tasks.splice(index, 1);
      },

    getTasks(projectName: string): Task[] {
        switch (projectName) {
          case "Projet 1A":
            return [
              { name: "Tâche 1", details: "Détails de la tâche 1",category:"" },
              { name: "Tâche 2", details: "Détails de la tâche 2",category:"" },
              { name: "Tâche 3", details: "Détails de la tâche 3",category:"" },
            ];
          case "Projet 1B":
            return [
              { name: "Tâche 4", details: "Détails de la tâche 4",category:"" },
              { name: "Tâche 5", details: "Détails de la tâche 5",category:"" },
            ];
          default:
            return [];
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .box-container {
    display: flex;
    justify-content: center;
  }
  
  .box {
    margin: 20px;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
  
  .square-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .square {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin: 10px;
    background-color: #ddd;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.2rem;
  }
  
  .task {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

  }

  .task-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .task-description {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .task-participants {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }

  .task-status {
    font-size: 0.8rem;
    font-style: italic;
    color: #777;
  }

</style>
  