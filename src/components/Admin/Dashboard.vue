<template>        
    <div class="main-content">
        <div class="sidebar">
            <ul class="sidebar-links">
                <li class="collapsible">Hotel</li>
                <div class="content-collapsible">
                <ul>
                    <li>Create</li>
                    <li>Update</li>
                    <li>Delete</li>
                </ul>
                </div>
                <li class="collapsible">Promociones</li>
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
        <div class="content">
            <center><h3>Hello Admin!</h3></center>
        </div>
    </div>
</template>

<script>
import { auth } from '@/firebase.js'

export default {
    name: 'Dashboard',
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

<style scoped>
    .header{
        width: 100%;
        height: 120px;
        background-color: black;
        color: white;
    }
    #image{
        height: 80px;
        background-color: white;
        border-radius: 50px;
    }
    .main-content{
        display: flex;
    }
    .sidebar{
        flex: 1;
        height: calc(100vh - 120px);
        background-color: #2c3e50;
    }
    .content{
        flex: 3;
        height: calc(100vh - 120px);
        background-color: #fff;
        font-size: 20px;
        font-weight: bold;
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

