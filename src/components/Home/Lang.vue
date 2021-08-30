<template>
    <span style="" v-wow="{ 'animation-name': 'fadeInUp','animation-duration': '2s'}" id="Lenguaje">
        <span class="seMuestra">Idioma</span>
        <span class="seEscondera" v-if="this.Lenguaje">
            <ul style="padding:0">
                <li @click="SetLang(id.codigo)" style="margin-top:10px;" v-for="id in Idiomas" :key="id.codigo">
                    {{id.nombre}}
                </li>
            </ul>
        </span>
    </span>
</template>

<script>

export default {
    name: "Lang",
    data () {
      return {
        Lenguaje : null,
        Idiomas: {
            "español":{
                "nombre":"Español",
                "codigo":"es"
            },
            "inglés":{
                "nombre":"inglés",
                "codigo":"en"
            }
        }
      }
    },
    methods:{
        SetLang(id){  
            
            localStorage.setItem("Lang",id)
            this.$i18n.locale = id;           
        }
    },
    mounted(){
        if(!localStorage.lang){
            this.Lenguaje = navigator.language.substring(0, 2)
        }else{
            this.Lenguaje = localStorage.lang;
        }
    }
}
</script>

<style scoped>  

    .seEscondera{
        display:none;
    }
    #Lenguaje:hover span.seMuestra{
        display: none;
    }
    #Lenguaje:hover span.seEscondera{
        display:block;
    }
    #Lenguaje{
        position:fixed;
        width: 175px;
        display:block;
        bottom:50%;
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