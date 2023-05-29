<template>
    <div>
      <h1>{{ username }}</h1>
      <button class="btn btn-primary" @click="showForm = !showForm">Añadir Cliente</button>
      <button class="btn btn-success" @click="createProject">Crear proyecto</button>
      
      <div v-if="showForm" class="box-form" >
        <form @submit.prevent="addClient">
          <div class="form-group">
            <label for="clientName">Nombre del cliente :</label>
            <input type="text" class="form-control" id="clientName" v-model="newClient.nombre" required />
          </div>
          <div class="form-group">
            <label for="clientMail">Email :</label>
            <input type="text" class="form-control" id="clientMail" v-model="newClient.correo" required />
          </div>
          <div class="form-group">

            <label for="clientAdress">Direccion del cliente :</label>
            <input id="clientDireccion" class="form-control" v-model="newClient.direccion" required />
          </div>

          <button class="btn btn-dark" type="submit">Añadir</button>
        </form>
      </div>
      <div class="box-container">
        <div class="box">
          <h2>Clientes</h2>
          <div class="square-container">
            <div v-for="(client, index) in clientes" :key="index" class="square" @click="selectClient(client.id)">
              <div class="task-name">{{ client.nombre }}</div>
              <button class="btn btn-danger btn-block mr-2" @click="deleteClient(client.id)">borrar</button>
            </div>
          </div>
        </div>
        <div class="box">
          <h2>Projets associés</h2>
          <div class="square-container">
            <div v-for="(project, index) in projects" :key="index" class="square" @click="showProjectName(project)">
              {{ project.nombre }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from "vue";
  import { useRouter } from 'vue-router'
  
  interface Client {
  id: string;
  nombre: string;
  correo: string;
  direccion: string;
  }
  export default defineComponent({
    name: "ProjectList",
    setup(){
      const router = useRouter();
      const createProject = () => {
        router.push('/CreateProject') // redirige vers la page '/register'
      }
      return { createProject}
    },
    data() {
      return {
        username: "",
        clientes: [{id:"1",nombre:"Client 1"}, {id:"2", nombre:"Client 2"}],
        selectedClient: "",
        projects: [] as any[],
        showForm: false,
        newClient: {
          id: "",
          nombre: "",
          correo: "",
          direccion: ""
        }
      };
    },
    created: async function(){
    console.log('Ver si llega');
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/clientes/');
      console.log(response);
      console.log(response.data);
      this.clientes=response.data;
    } catch (error) {
      console.error(error);
    }
    
  },
    methods: {
      selectClient(client: any) {
        console.log(client);
        this.selectedClient = client;
        this.getProjects(client);
      },
      getProjects: async function (id_cliente: string) {
       /* switch (client) {
          case "Client 1":
            return ["Project 1A", "Project 1B", "Project 1C"];
          case "Client 2":
            return ["Project 2A", "Project 2B", "Project 2C"];
          case "Client 3":
            return ["Project 3A", "Project 3B", "Project 3C"];
          default:
            return [];
        } */
        try{
          const response = await axios.get('http://localhost:3000/proyectos/?id_cliente='+id_cliente);
          this.projects=response.data;
        } catch (error) {
          console.error(error);
        }
      },
      showProjectName(project: any) {
        console.log(project.id);
        this.$router.push('/Proyectos/' + project.id);
      },
      addClient:async function () {
        //console.log(this.id as string);
        //this.tasks.push({ ...this.newTask });
        //this.newClient.id_proyecto= this.id as string;
        const response = await axios.post('http://localhost:3000/clientes/', this.newClient);
        this.getClients();
        this.newClient.nombre = "";
        this.newClient.correo = "";
        this.newClient.direccion = "";
        this.showForm = false;
      },
      deleteClient:async function(index: string) {
        //this.tasks.splice(index, 1);
        console.log(index);
        const response = await axios.delete('http://localhost:3000/clientes/'+index);
        console.log("response:");
        console.log(response.data);
        if(response.data.error!=false){
          window.alert('No se pudo eliminar porque tiene proyectos relacionados.');
        } else {
          this.getClients();
        }
      },
      getClients: async function() {
      
        try{
          const response = await axios.get('http://localhost:3000/clientes/');
          this.clientes=response.data;
        } catch (error) {
          console.error(error);
        }
    }
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
    /*display: flex;*/
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
  .box-form {
    text-align: left;
    width: 70%;
    margin: 0 auto;
  }
  </style>
  