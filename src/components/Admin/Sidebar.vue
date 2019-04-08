<template>
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
    
</style>