<template>
    <div class="site-section block-15  beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <Carousel :autoplay="true"                    
                      :per-page="this.sliders"
                      :loop="true"
                      :autoplayTimeout="1000"  >
                <Slide v-for="promosData in promos" :key="promosData.key" class="media-with-text p-md-5 flex-item"> 
                    <router-link :to="{ name: 'hotel', params: { key: promosData.hotel} }" >
                        <div class="img-border-sm mb-12">                        
                            <div href="#!" class="image-play">
                                <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                            </div>                        
                        </div> 
                    </router-link>
                    <h2 class="heading mb-0">{{promosData.key}}</h2>
                        
                    <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ Math.round((promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100))),2) }}</strong></center>
                    </p>
                    <p v-else class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ promosData.precioDol }}</strong></center> 
                    </p>                    
                    <center><p>{{promosData.name}}</p></center>
                    <span v-if="promosData.fechaFin" class="mb-3 d-block post-date"><center>De el {{promosData.fechaInicio}} Hasta el {{promosData.fechaFin}}</center></span>
                    <span v-else class="mb-3 d-block post-date">Por siempre</span>
                </Slide>                       
            </Carousel>
        </div>       
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Promociones",
    components: {
        Carousel,
        Slide
    },
    data () {
      return {
        files: [],
        sliders: null,
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
                    .orderByChild('mainPromo')
                    .equalTo("True")
                    .once("value")
                ).val()
            } catch (ex) {
                return console.error(ex)
            }   
        },
    },    
    async mounted() {
        this.sliders = Math.round(window.screen.width/448)   
        //console.log(this.sliders)
        await this.getPromos()         
    }
}
</script>

<style scoped>
    .img-fluid{
        height: 300px;
        width: 448px;
    }
</style>
