<template>
    <div class="container">
      <h2>Gérer le projet</h2>
      <form @submit.prevent="updateProject">
        <!-- Project status -->
        <div class="form-group">
          <label for="projectStatus">Statut du projet:</label>
          <select id="projectStatus" class="form-control" v-model="projectStatus" required>
            <option value="">-- Sélectionner un statut --</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
  
        <!-- Add personnel -->
        <div class="form-group">
          <label for="addPersonnel">Ajouter du personnel:</label>
          <select id="addPersonnel" class="form-control" v-model="newPersonnel">
            <option value="">-- Sélectionner une personne --</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">{{ user.name }} {{ user.surname }}</option>
          </select>
          <button @click.prevent="addPersonnelToProject" class="btn btn-primary mt-2">Ajouter</button>
        </div>
  
        <!-- Add task -->
        <div class="form-group">
          <label for="addTask">Ajouter une tâche:</label>
          <input type="text" id="addTask" class="form-control" v-model="newTaskName" placeholder="Nom de la tâche" required>
          <input type="number" id="addTaskCost" class="form-control mt-2" v-model="newTaskCost" placeholder="Coût de la tâche" min="0" step="0.01" required>
          <button @click.prevent="addTask" class="btn btn-primary mt-2">Ajouter</button>
        </div>
  
        <!-- Update or delete project -->
        <button type="submit" class="btn btn-success mt-2">Mettre à jour</button>
        <button @click.prevent="deleteProject" class="btn btn-danger mt-2">Supprimer</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['projectId'],
    data() {
      return {
        projectStatus: '',
        availableUsers: [],
        newPersonnel: '',
        newTaskName: '',
        newTaskCost: '',
      };
    },
  
    created() {
      this.getProjectDetails();
    },
  
    methods: {
      async getProjectDetails() {
        try {
          // Récupérer les détails du projet, les utilisateurs disponibles et les tâches du projet
        } catch (error) {
          console.error(error);
        }
      },
  
      async updateProject() {
        try {
          // Mettre à jour le projet avec les nouvelles données
        } catch (error) {
          console.error(error);
        }
      },
  
      async addPersonnelToProject() {
        try {
          // Ajouter le personnel sélectionné au projet
        } catch (error) {
          console.error(error);
        }
      },
  
      async addTask() {
        try {
          // Ajouter la nouvelle tâche au projet
        } catch (error) {
          console.error(error);
        }
      },
  
     
  