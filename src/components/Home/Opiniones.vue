<template>
    <div class="site-section block-14 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Opiniones de nuestros clientes</h2>
                </div>
            </div>
            <div class="nonloop-block-14 owl-carousel">
                <div v-for="opinionsData in opinions" :key="opinionsData.key" class="p-4">
                    <div class="d-flex block-testimony">
                        <div class="person mr-3">
                            <img :src="opinionsData.image || '../../../public/assets/images/person_1.jpg'" alt="Image" class="img-fluid rounded">
                        </div>
                        <div>
                            <h2 class="h5">{{opinionsData.name}}</h2>
                            <span class="mb-3 d-block post-date">{{opinionsData.createdAt}}</span>
                            <blockquote>&ldquo;{{opinionsData.opinion}}&rdquo;</blockquote>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>
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
    name: "Opiniones",
    data () {
      return {
        files: [],
        opinion: null,
        nombre: null,
        opinions: [],
        opinionsRef: db.child("opinions")
      }
    },
    methods:{
        getFiles() {
            this.files = this.$refs.files.files
        },    
        async addOpinion() {
            const key = this.opinionsRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("opinions")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.nombre,
                    opinion: this.opinion,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.opinionsRef.child(key).set(update)
            } catch (ex) {
                return console.error(ex)
            }
            alert("Opinión Agregada con éxito.")
        },
        async getOpinions() {
           try {
                this.opinions = (
                    await db
                    .child("opinions")
                    .once("value")
                ).val()
                console.log()
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },  
    async created() {   
        await this.getOpinions()
    },
    updated () {
        if ($('.nonloop-block-14').length > 0) { $('.nonloop-block-14').owlCarousel({ center: false, items: 1, loop: true, stagePadding: 0, autoplay: true, margin: 20, nav: true, dots: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'], responsive: { 600: { margin: 20, stagePadding: 0, items: 1 }, 1000: { margin: 20, stagePadding: 0, items: 2 } } }); }
    }
}
</script>

<style scoped>
    
</style>