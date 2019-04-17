<template>
    <div class="site-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                        <h2 class="mb-5">Vea nuestro establecimiento</h2>
                    </div>
                </div>
                <div class="row no-gutters">  
                    <gallery :images="images" :index="index" @close="index = null"></gallery>                 
                    <div v-for="(fotosData, i) in fotos" :key="i" @click="index = i" class="col-md-6 col-lg-3">
                        <img style="cursor:pointer;width:232.5; height:154.89 !important" :src="fotosData.image || '../../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid" :title=fotosData.name>
                    </div>                       
                </div>
                
                <div class="row">
                    <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                        <router-link :to="{ name: 'galeria', params: { key: this.$route.params.key } }">Ver todas las fotos
                        </router-link>
                    </div>
                </div>                
            </div>            
        </div>    
</template>

<script>

import VueGallery from 'vue-gallery';

export default {
    props: {
        fotos: {
            required: true
        }, 
        images: {
            required: true
        },
        index: {
            required: true
        }
    },
    components:{
        'gallery': VueGallery
    },
    name: "Fotos",
    data () {
      return {
        
      }
    }
}
</script>

<style scoped>
    .image{
        width: 232.5 !important;
        height: 154.89 !important;
    }
</style>