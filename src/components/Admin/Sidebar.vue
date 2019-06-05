<template>
    <div class="sidebar">
        <ul class="sidebar-links">
           
            <li class="collapsible">
                Hotel
            </li>
            <div class="content-collapsible">
            <ul>
                <router-link to="/Dashboard/hotel/create">
                    <li>                    
                        Crear                    
                    </li>                
                </router-link>
                <router-link to="/Dashboard/hotel/update">
                    <li>
                        Actualizar
                    </li> 
                </router-link>
                               
            </ul>
            </div>
            <li class="collapsible">
                Promociones
            </li>
            <div class="content-collapsible">
            <ul>
                <router-link to="/Dashboard/promociones/create">
                    <li>                    
                        Crear                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/promociones/update">
                    <li>                    
                        Actualizar                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/promociones/delete">
                    <li>                    
                        Borrar                    
                    </li>
                </router-link>
            </ul>
            </div>
            <li class="collapsible">Habitaciones</li>
            <div class="content-collapsible">
            <ul>
                <router-link to="/Dashboard/habitaciones/create">
                    <li>                    
                        Crear                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/habitaciones/update">
                    <li>                    
                        Actualizar                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/habitaciones/delete">
                    <li>                    
                        Borrar                    
                    </li>
                </router-link>
            </ul>
            </div>
            <li class="collapsible">Características de habs.</li>
            <div class="content-collapsible">
            <ul>
                <router-link to="/Dashboard/habitacionesCar/create">
                    <li>                    
                        Create                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/habitacionesCar/update">
                    <li>                    
                        Update                    
                    </li>
                </router-link>
                <router-link to="/Dashboard/habitacionesCar/delete">
                    <li>                        
                        Delete                        
                    </li>
                </router-link>
            </ul>
            </div>
            <li class="collapsible">Fotos</li>
            <div class="content-collapsible">
            <ul>
                <router-link to="/Dashboard/fotos/create">
                    <li>                    
                        Crear                    
                    </li>                
                </router-link>
                <router-link to="/Dashboard/fotos/delete">
                    <li>                    
                        Borrar                    
                    </li>
                </router-link>
            </ul>
            </div>
            <li><div class="form" @click="logout">Salir</div></li>
        </ul>
    </div>
</template>

<script>
import { auth } from '@/firebase.js'

export default {
    name: 'Sidebar',
    data () {
        return {
        }
    },
    methods: {
        logout () {
            auth.signOut().then(() => this.$router.replace('Login'))
        }
    },
    mounted () {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("activeAdmin");
                var content = this.nextElementSibling;
                if (content.style.maxHeight){
                content.style.maxHeight = null;
                } else {
                content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    }
}
</script>

<style lang="">
    .sidebar{
        flex: 1;
        min-height: calc(100vh - 120px);
        background-color: #2c3e50;
    }
    .sidebar-links li{
        padding: 10px;
        border-bottom: 2px solid grey;
        list-style-type: none;
    }
    .sidebar-links li:hover{
        background-color: blue;
        color:white;
        cursor: pointer;
    }
    .activeAdmin, .collapsible:hover {
    background-color: #ccc;
    }
    .content-collapsible {
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #2c3e50;
    }
    .form{
        color:black;
        text-decoration: none;
    }
</style>