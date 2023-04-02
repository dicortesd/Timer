<template>
    <form class="custom-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Correo</label>
        <input
          v-model="form.correo"
          class="form-control"
          placeholder="test"
          required
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="form.contrasena"
          class="form-control"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="text-danger my-2"></div>
      <div class="d-flex justify-content-center my-2">
        <button class="btn btn-success btn-block mr-2" type="submit">Login</button>
        <button class="btn btn-primary btn-block ml-2" type="button" @click="onRegisterClick">Register</button>
      </div>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { Usuario } from '../../../Backend/src/models/usuario.model';
  import { verifyLogin } from '../../../Backend/src/controllers/usuario.controller';
  import axios from 'axios';
  
  export default defineComponent({
    name: "LoginComponent",
    setup() {
      const form = reactive({
        correo: '',
        contrasena: '',
      })
  
      const router = useRouter()
  
      const onSubmit = async () => {
        const newLogin: Usuario={
          correo : form.correo,
          contrasena : form.contrasena,
          nombre: '',
          apellido: '',
          rol: ''
        }
        console.log(newLogin);

        try {
          // Aquí es que se hace la conexión con el backend, pasándole la URL donde está corriendo.
          const response = await axios.post('http://localhost:3000/usuarios/verify/', newLogin);
          if (response.data.error== false){
            window.alert('Bienvenido '+ response.data.usuario.nombre);
            // Hace falta guardar información de login para los siguientes llamados del API
            router.push('/'+ response.data.usuario.rol);
          }
          else{
            window.alert('Verifique sus credenciales. ');
          }
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }

  
      const onRegisterClick = () => {
        router.push('/register') // redirige vers la page '/register'
      }
  
      return { form, onSubmit, onRegisterClick }
    },
  })
  </script>
  
  <style scoped>
  .custom-form {
    max-width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .text-danger {
    color: red;
  }
  
  .btn-block {
    display: block;
    width: 100%;
  }
  </style>