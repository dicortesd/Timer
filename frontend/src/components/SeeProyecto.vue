<template>
  <div>
    <h1>{{ projectName }} {{ id }}</h1>
    <button class="btn btn-success" @click="showForm = !showForm">Añadir Tarea</button>
    <button class="btn btn-primary" @click="showFormCategoria = !showFormCategoria">Añadir Categor&iacute;a</button>
    <div v-if="showForm" class="box-form">
      <form @submit.prevent="addTask">
        <div class="form-group">
          <label for="taskName">Nombre de la tarea :</label>
          <input type="text" class="form-control" id="taskName" v-model="newTask.nombre" required />
        </div>
        <div class="form-group">
          <label for="categoria">Categor&iacute;a :</label>
          <select id="categoria" class="form-control" v-model="newTask.id_categoria" required>
                <option value="">-- Seleccionar una categoria --</option>
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="taskDetails">Observaciones :</label>
          <textarea class="form-control" id="taskDetails" v-model="newTask.observaciones" required></textarea>
        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
    <div v-if="showFormCategoria" class="box-form">
      <form @submit.prevent="addCategory">
        <div class="form-group">
          <label for="categoryName">Nombre de la categor&iacute;a :</label>
          <input type="text" class="form-control" id="categoryName" v-model="newCategory.nombre" required />
        </div>
        <div class="form-group">
          <label for="valor_hora">Valor hora :</label>
          <input type="text" class="form-control" id="valor_hora" v-model="newCategory.valor_hora" required />

        </div>
        <button type="submit">Añadir</button>
      </form>
    </div>
    <div class="box-container">
      <div class="box">
        <h2>Usuarios</h2>
        <div class="square-container">
          <div v-for="(participant, index) in participants" :key="index" class="square">
            {{ participant.nombre }} {{ participant.apellido }}
          </div>
        </div>
      </div>
      <div class="box">
        <h2>Tareas</h2>
        <div v-for="(task, index) in tasks" :key="index" class="task">
          <div class="task-name">{{ task.nombre }}</div>
          <div class="task-category">{{ task.id_categoria }}</div>
          <div class="task-details">{{ task.observaciones }}</div>
          <button class="btn btn-danger btn-block mr-2" @click="deleteTask(task.id)">borrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from "vue";
import { threadId } from 'worker_threads';

interface Task {
  id: string;
  nombre: string;
  id_categoria: string;
  observaciones: string;
  id_proyecto: string;
}

export default defineComponent({
  name: "ProjectDetails",
  setup(){
    //console.log(this.$route.params.id);
  },
  data() {
    return {
      projectName: "Projet 1A",
      participants: [{id: 1, nombre: "Participant 1", apellido: "Apellido 1"}, {id: 2, nombre: "Participant 2", apellido: "Apellido 2"}, {id: 3, nombre: "Participant 3", apellido: "Apellido 3"}],
      tasks: [] as Task[],
      showForm: false,
      showFormCategoria:false,
      categorias: [
        { id: "1", nombre: 'Hacer' },
        { id: "2", nombre: 'En curso' },
        { id: "3", nombre: 'Terminado' }
      ],
      newTask: {
        id: "",
        nombre: "",
        id_categoria: "",
        observaciones: "",
        id_proyecto: ""
      },
      newCategory: {
        id: "",
        nombre: "",
        valor_hora: ""
      },
      id: this.$route.params.id
    };
  },

  created: async function(){
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/proyectos/'+ this.id);
      console.log(response);
      console.log(response.data);
      this.projectName=response.data[0].nombre;
    } catch (error) {
      console.error(error);
    }
    this.getTasks();

    console.log('Ver si llega');
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/proyectos/'+ this.id +'/usuarios');
      console.log(response);
      console.log(response.data);
      this.participants=response.data;
    } catch (error) {
      console.error(error);
    }
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/categorias/');
      console.log(response);
      console.log(response.data);
      this.categorias=response.data;
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    addTask:async function () {
      console.log(this.id as string);
      //this.tasks.push({ ...this.newTask });
      this.newTask.id_proyecto= this.id as string;
      const response = await axios.post('http://localhost:3000/tareas/', this.newTask);
      this.getTasks();
      this.newTask.nombre = "";
      this.newTask.id_categoria = "";
      this.newTask.observaciones = "";
      this.showForm = false;
    },
    deleteTask:async function(index: string) {
      //this.tasks.splice(index, 1);
      console.log(index);
      const response = await fetch('http://localhost:3000/tareas/'+index,{method: 'DELETE'});
      console.log(response);
      this.getTasks();
    },

  getTasks: async function() {
      /*switch (projectName) {
        case "Projet 1A":
          return [
            { id: "1", nombre: "Tâche 1", observaciones: "Détails de la tâche 1",id_categoria:"",id_proyecto: "" },
            { id: "2", nombre: "Tâche 2", observaciones: "Détails de la tâche 2",id_categoria:"",id_proyecto: "" },
            { id: "3", nombre: "Tâche 3", observaciones: "Détails de la tâche 3",id_categoria:"" ,id_proyecto: ""},
          ];
        case "Projet 1B":
          return [
            { id: "4", nombre: "Tâche 4", observaciones: "Détails de la tâche 4",id_categoria:"",id_proyecto: "" },
            { id: "5", nombre: "Tâche 5", observaciones: "Détails de la tâche 5",id_categoria:"",id_proyecto: "" },
          ];
        default:
          return [];
      } */
      try{
        const response = await axios.get('http://localhost:3000/tareas/?id_proyecto='+this.id);
        this.tasks=response.data;
      } catch (error) {
        console.error(error);
      }
    },
    addCategory:async function () {
      console.log(this.id as string);
      //this.tasks.push({ ...this.newTask });
      await axios.post('http://localhost:3000/categorias/', this.newCategory);
      const response = await axios.get('http://localhost:3000/categorias/');
      console.log(response);
      console.log(response.data);
      this.categorias=response.data;

      this.newCategory.nombre = "";
      this.newCategory.valor_hora = "";
      this.showFormCategoria = false;
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

.box-form {
  text-align: left;
  margin : auto;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  /*height: 250px;*/
  width: 400px;
}

  .select-short {
  margin : auto;
  width: 150px;
  }

.box-form label,
.box-form input,
.box-form select,
.box-form textarea {
  margin-bottom: 10px;
}

</style>