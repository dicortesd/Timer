<template>
    <div class="container">
      <form>
        <table>
          <tr>
            <td><label>Nombre</label></td>
            <td><input type="text" v-model="form.nombre"></td>
            <td><label>Roi/cargo</label></td>
            <td><input type="text" v-model="form.roi"></td>
          </tr>
          <tr>
            <td><label>Correo electronico</label></td>
            <td><input type="email" v-model="form.email"></td>
            <td><label>Empresa</label></td>
            <td><input type="text" v-model="form.empresa"></td>
          </tr>
          <tr>
            <td><label>Contrasena</label></td>
            <td><input type="password" v-model="form.password"></td>
            <td><label>Confirmar contrasena</label></td>
            <td><input type="password" v-model="form.confirmPassword"></td>
          </tr>
        </table>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue'
  
  export default defineComponent({
    name: 'RegisterView',
    setup() {
      const form = reactive({
        nombre: '',
        roi: '',
        email: '',
        empresa: '',
        password: '',
        confirmPassword: '',
      })
  
      const onSubmit = () => {
        console.log('Form submitted')
      }
  
      return { form, onSubmit }
    },
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
  }
  
  label {
    font-weight: bold;
    margin-right: 1rem;
  }
  
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }
  
  button[type='submit'] {
    display: block;
    margin-top: 1rem;
  }
  </style>
  