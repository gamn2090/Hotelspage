<template>
        <div  class="site-section">
            <div id="galeria" class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                        <h2 class="mb-5">{{$t('Galeria["Titulo"]')}}</h2>
                    </div>
                </div>
                <div class="row no-gutters">  
                    <gallery :images="images" :index="index" @close="index = null"></gallery>                 
                    <div v-for="(fotosData, i) in fotos" :key="i" @click="index = i" class="col-md-6 col-lg-3">
                        <img style="cursor:pointer;width:232.5; height:154.89 !important" :src="fotosData.image || '../../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid">
                    </div>                       
                </div>                                       
            </div>            
        </div>    
</template>

<script>
import { db } from '@/firebase.js'
//importo el owl carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

import VueGallery from 'vue-gallery';

export default {
    name: "Fotos",
    data () {
      return {
        fotos: [],
        images: [],
        index : null,
      }
    },
    components: {
        'gallery': VueGallery
    },
    methods:{
        getFiles() {
            this.files = this.$refs.files.files
        },       
        async getFotos() {
           try {
                this.fotos = (
                    await db
                    .child("fotos")
                    .orderByChild('hotel')
                    .equalTo(this.$route.params.key)
                    .once("value")                    
                ).val()              
                
                for (var foto in this.fotos) {
                    this.images.push(this.fotos[foto].image);                    
                }   
                //console.log(this.images) 
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },  
    async created() {        
        await this.getFotos()       
    }
}
</script>

<style scoped>
    .image{
        width: 232.5 !important;
        height: 154.89 !important;
    }
</style>