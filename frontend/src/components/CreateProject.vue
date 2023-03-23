<template>
    <div>
      <h1>Créer un nouveau projet</h1>
      <form @submit.prevent="createProject">
        <label for="projectName">Nom du projet:</label>
        <input type="text" id="projectName" v-model="projectName">
        <br>
        <label for="projectDescription">Description:</label>
        <textarea id="projectDescription" v-model="projectDescription"></textarea>
        <br>
        <label for="projectAssignee">Assigner à:</label>
        <select id="projectAssignee" v-model="projectAssignee">
          <option value="">-- Sélectionner une personne --</option>
          <option v-for="person in people" :key="person.id" :value="person.id">{{ person.name }}</option>
        </select>
        <br>
        <button type="submit">Créer</button>
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
        people: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' }
        ]
      }
    },
    methods: {
      createProject() {
        // Envoyer les données du formulaire au backend pour créer un nouveau projet
        console.log('Créer un nouveau projet:', this.projectName, this.projectDescription, this.projectAssignee);
        // Réinitialiser le formulaire
        this.projectName = '';
        this.projectDescription = '';
        this.projectAssignee = '';
      }
    }
  }
  </script>
  