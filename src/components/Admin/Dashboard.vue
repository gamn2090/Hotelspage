<template>
    <a class="form" href="#!" @click="logout">logout</a>
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

