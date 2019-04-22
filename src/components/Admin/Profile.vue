
<template>        
    <div class="content">
        <br><br><br><br><br>
        <center><h3>Bienvenido a la vista de Administrador</h3></center>
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
   
</style>

