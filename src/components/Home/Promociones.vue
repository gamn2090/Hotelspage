<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <!-- inicio el for -->
            <div class="nonloop-block-15 owl-carousel">
                <div v-for="promosData in promos" :key="promosData.key" class="media-with-text p-md-5">
                    <div class="img-border-sm mb-4">
                        <a href="#!" class="image-play">
                            <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" alt="" class="img-fluid">
                        </a>
                    </div>
                    <h2 class="heading mb-0"><a href="#!">{{promosData.name}}</a></h2>
                    <span class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFinal}}</span>
                    <p>{{promosData.description}}</p>
                </div> 
                      
            </div>
            <!-- fin del for -->            
        </div>
        <!--<div>
            <label for="">
                Promocion
            </label>
            <input type="text" v-model="promo">
            <label for="">
                Descripcion
            </label>
            <input type="text" v-model="description">
            <br><br>
            <label for="image">Imagen</label>
            <input type="file" @change="getFiles()" ref="files">
            <button @click="addPromo">Add</button>
        </div>-->
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Promociones",
    data () {
      return {
        files: [],
        promo: null,
        description: null,
        promos: [],
        promosRef: db.child("promos")
      }
    },
    methods:{
        getFiles() {
            this.files = this.$refs.files.files
        },    
    async addPromo() {
            const key = this.promosRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("promos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.promo,
                    description: this.description,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.promosRef.child(key).set(update)
            } catch (ex) {
                return console.error(ex)
            }
            alert("Promoción Agregada con éxito.")
        },
        async getPromos() {
           try {
                this.promos = (
                    await db
                    .child("promos")
                    .once("value")
                ).val()
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },  
    async created() {
        await this.getPromos()       
    },
    updated () {
        if ($('.nonloop-block-15').length > 0) { $('.nonloop-block-15').owlCarousel({ center: false, items: 1, loop: true, stagePadding: 0, autoplay: true, margin: 20, nav: true, dots: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'], responsive: { 600: { margin: 20, stagePadding: 0, items: 1, nav: false, dots: true }, 1000: { margin: 20, stagePadding: 0, items: 2, nav: true, dots: true }, 1200: { margin: 20, stagePadding: 0, items: 3, nav: true, dots: true } } }); }
    }
}
</script>

<style scoped>

</style>
