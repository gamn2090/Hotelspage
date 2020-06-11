<template>
    <div class="site-section  beige-backgound">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                        <h2 class="mb-5">Algunas de nuestras fotos</h2>
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
import { db, storage } from '@/firebase.js'
import moment from "moment"

import VueGallery from 'vue-gallery';

export default {
    name: "Fotos",
    data () {
      return {
        files: [],
        foto: null,
        fotos: [],
        images: [],
        index : null,
        fotosRef: db.child("fotos")
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
                    .limitToLast(4)
                    .once("value")                    
                ).val()

                for (var elem in this.fotos) {
                    this.images.push(this.fotos[elem].image);                    
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