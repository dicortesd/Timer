<template>
    <div>
      <h1>{{ username }}</h1>
      <div class="box-container">
        <div class="box">
          <h2>Clients</h2>
          <div class="square-container">
            <div v-for="(client, index) in clients" :key="index" class="square" @click="selectClient(client)">
              {{ client }}
            </div>
          </div>
        </div>
        <div class="box">
          <h2>Projets associés</h2>
          <div class="square-container">
            <div v-for="(project, index) in projects" :key="index" class="square" @click="showProjectName(project)">
              {{ project }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "ProjectList",
    data() {
      return {
        username: "John Doe",
        clients: ["Client 1", "Client 2", "Client 3"],
        selectedClient: "",
        projects: [] as string[],
      };
    },
    methods: {
      selectClient(client: string) {
        this.selectedClient = client;
        this.projects = this.getProjects(client);
      },
      getProjects(client: string): string[] {
        switch (client) {
          case "Client 1":
            return ["Project 1A", "Project 1B", "Project 1C"];
          case "Client 2":
            return ["Project 2A", "Project 2B", "Project 2C"];
          case "Client 3":
            return ["Project 3A", "Project 3B", "Project 3C"];
          default:
            return [];
        }
      },
      showProjectName(project: string) {
        console.log(project);
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
    cursor: pointer;
  }
  </style>
  