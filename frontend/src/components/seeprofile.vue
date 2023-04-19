<template>
    <div class="container">
      <h1>Perfil de usuario</h1>
      <table>
        <tr>
          <td><label>Nombre</label></td>
          <td>{{ user.nombre }} {{ user.apellido }}</td>
        </tr>
        <tr>
          <td><label>Rol/cargo</label></td>
          <td>{{ user.rol }}</td>
        </tr>
        <tr>
          <td><label>Correo electronico</label></td>
          <td>{{ user.correo }}</td>
        </tr>
        <tr>
          <td><label>Empresa</label></td>
          <td>{{ user.empresa }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  interface UserProfile {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    empresa: string;
  }
  
  export default defineComponent({
    name: 'SeeProfile',
    setup() {
      // Remplacez 'user' avec les informations de l'utilisateur récupérées depuis votre API
      const user = reactive<UserProfile>({
        nombre: 'John',
        apellido: 'Doe',
        correo: 'john.doe@example.com',
        rol: 'manageur',
        empresa: 'ACME Corp',
      });
  
      return { user };
    },
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  label {
    font-weight: bold;
    margin-right: 1rem;
  }
  
  tr {
    border-bottom: 1px solid #ccc;
  }
  
  td {
    padding: 0.5rem;
  }
  </style>
  