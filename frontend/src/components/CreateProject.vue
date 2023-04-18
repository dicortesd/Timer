<template>
  <div class="container">
    <div class="row">
      <div class="col-md-5 offset-md-1">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Información del proyecto</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="createProject">
              <div class="form-group">
                <label for="projectClient">Cliente:</label>
                <select id="projectClient" class="form-control" v-model="id_cliente" required>
                  <option value="">-- Seleccionar un cliente --</option>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="projectName">Nombre del proyecto:</label>
                <input type="text" id="projectName" class="form-control" v-model="nombre" required>
              </div>
              <div class="form-group">
                <label for="projectAssignee">Asignar a:</label>
                <select id="projectAssignee" class="form-control" v-model="usuarios" multiple>
                  <option value="">-- Seleccionar una persona --</option>
                  <option v-for="usuario in usuariosTotalidad" :key="usuario.id" :value="usuario.id">{{ usuario.nombre }} {{ usuario.apellido }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" class="form-control" v-model="descripcion"></textarea>
              </div>
                <div class="form-group">
                  <label for="projectDueDate">Fecha de entrega:</label>
                  <select id="projectDueDate" class="form-control" v-model="projectDueDate">
                    <option value="">-- Seleccionar una fecha --</option>
                    <option v-for="date in dueDates" :key="date">{{ date }}</option>
                  </select>
                </div>
              <button type="submit" class="btn btn-primary btn-block mt-4">Crear</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-5 offset-md-1">
        <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Información adicional</h5>
                <div class="form-group">
                  <label for="projectGoals">Objetivos:</label>
                  <select id="projectGoals" class="form-control" v-model="projectGoals">
                  <option value="">-- Seleccionar un objetivo --</option>
                  <option v-for="objetivo in Objetivos" :key="objetivo.id" :value="objetivo.id">{{ objetivo.name }}</option>
                </select>
                </div>
              </div>
                <div class="form-group">
                  <label for="projectNotes">Notas:</label>
                  <textarea id="projectNotes" class="form-control" v-model="projectNotes"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      nombre: '',
      descripcion: '',
      usuarios: '',
      projectDueDate: '',
      clientes: [
        { id: 1, nombre: 'Cliente1' },
        { id: 2, nombre: 'Cliente2' },
        { id: 3, nombre: 'Cliente3' }
      ],
      usuariosTotalidad: [
        { id: 1, name: 'Juan' },
        { id: 2, name: 'Maria' },
        { id: 3, name: 'Pedro' }
      ],
      Objetivos: [
        { id: 1, name: 'Efficienca'},
        { id: 2, name: 'Rapidez'},
        { id: 3, name: 'Cualidad'}
      ],
      dueDates: [
        '1 semana',
        '2 semanas',
        '3 semanas',
        '1 mes',
        '2 meses',
        '3 meses'
      ],
      selectedTab: 'fecha'
    }
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
    try {
      // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
      const response = await axios.get('http://localhost:3000/usuarios/');
      console.log(response);
      console.log(response.data);
      this.usuariosTotalidad=response.data;
    } catch (error) {
      console.error(error);
    }
  },
  
  methods: {
    loadClientes(){
      console.log('Ver si llega');
    },
    createProject: async function () {
      // Enviar los datos del formulario al backend para crear un nuevo proyecto
      //console.log('Crear un nuevo proyecto:', this.nombre, this.descripcion, this.projectAssignee, this.projectDueDate);

      console.log(this.usuarios);

      console.log(this);
      //this.usuarios=this.projectAssignee;
      const response = await axios.post('http://localhost:3000/proyectos/', this);

      // Reinicializar el formulario
      this.nombre = '';
      this.descripcion = '';
      this.usuarios = '';
      this.projectDueDate = '';
    }
  }
}

</script>

<style>
.container {
  margin-top: 50px;
}
</style>
