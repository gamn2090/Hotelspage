<template>
    <span style="text-align:center" v-wow="{ 'animation-name': 'fadeInUp','animation-duration': '2s'}" id="WCheckin">
        <router-link style="color:white" :to="{ path: '/Web-checkin'}">
            Check-in<br> online
        </router-link>                
    </span>
</template>

<script>
export default {
    name: "WCheckin"    
}
</script>

<style scoped>    
    #WCheckin{
        position:fixed;
        display:block;
        bottom:5%;
        right:5%;
        background-color:#d33925;
        color:white;
        padding: 8px;
        border-radius: 50%;
        z-index: 999;
        cursor: pointer;
    }
</style>