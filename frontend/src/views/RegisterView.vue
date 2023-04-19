<template>
    <div class="container">
      <!--Se metió el form para activar el método submit cuando se espicha el botón de registrar-->
      <form @submit.prevent="onSubmit">
        <table>
          <tr>
            <td><label>Nombre</label></td>
            <td><input type="text" v-model="form.nombre" required></td>
            <td><label>Rol/cargo</label></td>
            <td><input type="text" v-model="form.rol"></td>
          </tr>
          <tr>
            <td><label>Correo electronico</label></td>
            <td><input type="email" v-model="form.email"></td>
            <td><label>Empresa</label></td>
            <td><input type="text" v-model="form.empresa"></td>
          </tr>
          <tr>
            <td><label>Contraseña</label></td>
            <td><input type="password" v-model="form.contrasena"></td>
            <td><label>Confirmar contraseña</label></td>
            <td><input type="password" v-model="form.confirmContrasena"></td>
          </tr>
        </table>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  

  <script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { Usuario } from '../../../Backend/src/models/usuario.model';
  import { create} from '../../../Backend/src/controllers/usuario.controller';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'RegisterView',
    setup() {
      const form = reactive({
        nombre: '',
        rol: '',
        email: '',
        empresa: '',
        contrasena: '',
        confirmContrasena: '',
      });
  
      const onSubmit = async () => {
        const mots = form.nombre.split(" ");
        const newUser: Usuario = {
          nombre: mots[0],
          apellido: mots.slice(1).join(" "),
          correo: form.email,
          rol: form.rol,
          contrasena: form.contrasena
        };


        try {
          // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
          const response = await axios.post('http://localhost:3000/usuarios/', newUser);
          console.log("oui");
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
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
  