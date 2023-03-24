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
                <label for="projectName">Nombre del proyecto:</label>
                <input type="text" id="projectName" class="form-control" v-model="projectName">
              </div>
              <div class="form-group">
                <label for="projectAssignee">Asignar a:</label>
                <select id="projectAssignee" class="form-control" v-model="projectAssignee">
                  <option value="">-- Seleccionar una persona --</option>
                  <option v-for="person in people" :key="person.id" :value="person.id">{{ person.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="projectDescription">Descripción:</label>
                <textarea id="projectDescription" class="form-control" v-model="projectDescription"></textarea>
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
export default {
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectAssignee: '',
      projectDueDate: '',
      people: [
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
  methods: {
    createProject() {
      // Enviar los datos del formulario al backend para crear un nuevo proyecto
      console.log('Crear un nuevo proyecto:', this.projectName, this.projectDescription, this.projectAssignee, this.projectDueDate);
      // Reinicializar el formulario
      this.projectName = '';
      this.projectDescription = '';
      this.projectAssignee = '';
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
