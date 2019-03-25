<template>
    <div class="site-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                        <h2 class="mb-5">Algunas de nuestras fotos</h2>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div v-for="fotosData in fotos" :key="fotosData.key" class="col-md-6 col-lg-3">
                        <a :href="fotosData.image || '../../../public/assets/images/img_1.jpg'" class="image-popup img-opacity"><img style="width:232.5; height:154.89 !important" :src="fotosData.image || '../../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid"></a>
                    </div>                    
                </div>                
            </div>
            <!--<div>
                <label for="">
                    Foto
                </label>
                <input type="text" v-model="foto">                    
                <br><br>
                <label for="image">Imagen</label>
                <input type="file" @change="getFiles()" ref="files">
                <button @click="addFoto">Add</button>
            </div>-->
        </div>    
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"
//importo el owl carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

export default {
    name: "Fotos",
    data () {
      return {
        files: [],
        foto: null,
        fotos: [],
        fotosRef: db.child("fotos")
      }
    },
    methods:{
        getFiles() {
            this.files = this.$refs.files.files
        },    
    async addFoto() {
            const key = this.fotosRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("fotos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.foto,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.fotosRef.child(key).set(update)
            } catch (ex) {
                return console.error(ex)
            }
            alert("Foto Agregada con éxito.")
        },
        async getFotos() {
           try {
                this.fotos = (
                    await db
                    .child("fotos")
                    .once("value")
                ).val()
                console.log('tengo las fotos')
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },  
    async created() {
        console.log('pido que se carguen las fotos')
        await this.getFotos()       
        console.log('fotos cargadas')
    }, async updated () {        
         $('.image-popup').magnificPopup({ type: 'image', closeOnContentClick: true, closeBtnInside: false, fixedContentPos: true, mainClass: 'mfp-no-margins mfp-with-zoom', gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] }, image: { verticalFit: true }, zoom: { enabled: true, duration: 300 } }); $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({ disableOn: 700, type: 'iframe', mainClass: 'mfp-fade', removalDelay: 160, preloader: false, fixedContentPos: false });
         console.log('aplicadas las clases')
    }
}
</script>

<style scoped>
    
</style>