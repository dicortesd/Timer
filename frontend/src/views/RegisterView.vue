<template>
    <div>
      <h1>Register</h1>
      <form>
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" class="form-control" id="nombre" v-model="form.nombre" required>
        </div>
        <div class="form-group">
          <label for="correo">Correo electrónico:</label>
          <input type="email" class="form-control" id="correo" v-model="form.correo" required>
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input type="password" class="form-control" id="contrasena" v-model="form.contrasena" required>
        </div>
        <div class="form-group">
          <label for="roi">ROI/Cargo:</label>
          <input type="text" class="form-control" id="roi" v-model="form.roi" required>
        </div>
        <div class="form-group">
          <label for="empresa">Empresa:</label>
          <input type="text" class="form-control" id="empresa" v-model="form.empresa" required>
        </div>
        <div class="form-group">
          <label for="confirma-contrasena">Confirma contraseña:</label>
          <input type="password" class="form-control" id="confirma-contrasena" v-model="form.confirmaContrasena" required>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Submit</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
    name: 'RegisterView',
    setup() {
      const form = reactive({
        nombre: '',
        correo: '',
        contrasena: '',
        roi: '',
        empresa: '',
        confirmaContrasena: '',
      });
  
      const onSubmit = () => {
        // Handle form submission
      };
  
      return { form, onSubmit };
    },
  });
  </script>
  
  <style scoped>
  .form-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  </style>
  