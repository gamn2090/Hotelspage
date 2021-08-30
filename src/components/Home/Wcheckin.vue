<template>    
    <router-link style="color:white" :to="{ path: '/Web-checkin', hash: '#checkin'}">
        <span style="" v-wow="{ 'animation-name': 'fadeInUp','animation-duration': '2s'}" id="WCheckin">
            <span class="seMuestra">Web Check-in</span><span class="seEscondera" v-html="$t('WebCinBtn')"></span>
        </span>
    </router-link>    
</template>

<script>
export default {
    name: "WCheckin"    
}
</script>

<style scoped>  

    .seEscondera{
        display:none;
    }
    #WCheckin:hover span.seMuestra{
        display: none;
    }
    #WCheckin:hover span.seEscondera{
        display:block;
    }
    #WCheckin{
        position:fixed;
        width: 175px;
        display:block;
        bottom:30%;
        right:0;
        text-align:center; 
        font-size:12px;
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