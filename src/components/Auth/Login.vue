<template>
    <span>
        
        <form class="form" @submit.prevent="login">
            <router-link :to="'/'" >
                <img class="img-background" src='~@/assets/logo3.png' alt="El Tambo">                                
            </router-link>
            <label>Cooreo electrónico del usuario</label>
            <input v-model="usuario" type="text" placeholder="Correo Electrónico">
            <label>Contraseña</label>
            <input v-model="contrasena" type="password" placeholder="Contraseña">
            <input type="submit" value="Acceder">
        </form> 
    </span>
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
    .img-background{
        background-color: #26180b;
    }
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