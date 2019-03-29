<template>
        <form class="form" @submit.prevent="login">
            <input v-model="usuario" type="text" placeholder="Correo Electrónico">
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <input type="submit" value="Acceder">
        </form> 
</template>

<script>
import { auth } from '@/firebase.js'

export default {
    name: "Login",
    data () {
      return {
        usuario: null,
        contrasena: null
      }
    },
    methods: {
        login() {
            auth                
                .signInWithEmailAndPassword(this.usuario, this.contrasena)
                    .then( (user) => this.$router.replace('Dashboard') , (error) => console.log(error) );                        
        }
    }
}
</script>

<style scoped>
    .form{
        display: flex;
        min-height: 100vh;
        border: 2px solid mistyrose;
        flex-direction: column;
        flex-wrap: wrap;  
        justify-content: center;
        align-items: center;
    }
</style>