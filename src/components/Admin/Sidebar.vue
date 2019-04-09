<template>
    <div class="sidebar">
        <ul class="sidebar-links">
           
            <li class="collapsible">
                <router-link to="/Dashboard/profile">
                    <a>Hotel</a>
                </router-link>
            </li>
            <div class="content-collapsible">
            <ul>
                <li>Create</li>
                <li>Update</li>
                <li>Delete</li>
            </ul>
            </div>
            <li class="collapsible">
                <router-link to="/Dashboard/content">
                    <a>Promociones</a>
                </router-link>
            </li>
            <div class="content-collapsible">
            <ul>
                <li>Create</li>
                <li>Update</li>
                <li>Delete</li>
            </ul>
            </div>
            <li class="collapsible">Habitaciones</li>
            <div class="content-collapsible">
            <ul>
                <li>Create</li>
                <li>Update</li>
                <li>Delete</li>
            </ul>
            </div>
            <li>Delete User</li>
            <li><a class="form" href="#!" @click="logout">Logout</a></li>
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
    created () {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
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
        height: calc(100vh - 120px);
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
    }
    .active, .collapsible:hover {
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