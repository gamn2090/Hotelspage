<template>    
    <router-link style="color:white" :to="{ path: '/Web-checkin', hash: '#checkin'}">
        <span style="" v-wow="{ 'animation-name': 'fadeInUp','animation-duration': '2s'}" id="WCheckin">
            ¿Tienes Reserva?<br>Realiza tu Check-in<br> online
        </span>
    </router-link>    
</template>

<script>
export default {
    name: "WCheckin"    
}
</script>

<style scoped>    
    #WCheckin{
        position:fixed;
        width: 175px;
        display:block;
        bottom:30%;
        right:0;
        text-align:center; 
        font-size:15px;
        background-color:rgb(11,119,61);
        color:white;
        padding: 8px;        
        z-index: 500;
        cursor: pointer;
    }
    @media only screen and (max-width: 500px) {
         #WCheckin{
             width: 100px;
             font-size:12px;
         }
    }
</style>