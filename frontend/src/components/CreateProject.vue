<template>
  <div>
    <h1>Crear un nuevo proyecto</h1>
    <form @submit.prevent="createProject">
      <label for="projectName">Nombre del proyecto:</label>
      <input type="text" id="projectName" v-model="projectName">
      <br>
      <label for="projectDescription">Descripción:</label>
      <textarea id="projectDescription" v-model="projectDescription"></textarea>
      <br>
      <label for="projectAssignee">Asignar a:</label>
      <select id="projectAssignee" v-model="projectAssignee">
        <option value="">-- Seleccionar una persona --</option>
        <option v-for="person in people" :key="person.id" :value="person.id">{{ person.name }}</option>
      </select>
      <br>
      <label for="projectDueDate">Fecha de entrega:</label>
      <select id="projectDueDate" v-model="projectDueDate">
        <option value="">-- Seleccionar una fecha --</option>
        <option v-for="date in dueDates" :key="date">{{ date }}</option>
      </select>
      <br>
      <button type="submit">Crear</button>
    </form>
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
      dueDates: [
        '1 semana',
        '2 semanas',
        '3 semanas',
        '1 mes',
        '2 meses',
        '3 meses'
      ]
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
