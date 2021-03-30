<template>
    <div class="site-section block-15  beige-backgound">
        <div class="container">
            <div class="row" style="margin-right:0;margin-left:0">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5 bannerFont">Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <Carousel v-if="this.promos != null" :autoplay="true"                    
                      :per-page="1"
                      :loop="true"
                      :autoplayTimeout="2000"  >
                <Slide v-for="promosData in promos" :key="promosData.key" class="promocionesTambo"> 
                    <!-- <router-link :to="{ name: 'hotel', params: { key: promosData.hotel} }" > -->
                    <div class="img-border-sm mb-12">                        
                        <div href="#!" class="image-play">
                            <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                        </div>                        
                    </div>
                <!-- </router-link> -->
                    <div class="innerContainer">
                        <div
                            class="row align-items-center justify-content-center vertical-align"
                        >
                            <div class="col-md-12 text-center onTop" data-aos="fade">
                            <h2 class="heading mb-0 tituloPromocion">{{promosData.name}}</h2>
                            <h3 class="mb-3 d-block post-date infoPromocion">{{promosData.description}}</h3>
                                                            
                            </div>                            
                        </div>
                    </div>                   
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
        //console.log(this.sliders)
        await this.getPromos()         
    }
}
</script>

<style scoped>
    .container{
        width:100% !important;
        margin:0 !important;
        padding:0 !important;
    }
    .img-fluid{
        height: 80vh;
        width: 100%;
    }
    .promocionesTambo{
        width: 100% !important;
        /*height: 60vh;*/
        text-align:left;
        position:relative;
    }   
    .vertical-align {
        display: table-cell;
        vertical-align: middle;
    }
    .onTop {
        position: relative;
        z-index: 99;
    }
    .innerContainer {
        border-radius: 7%;
        background-color: #fff;
        padding-right:20px;
        padding-bottom:20px;
        padding-top:20px;
        padding-left:10px;
        width: 30%;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 20%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 99;
    }
    .Carousel {
        height: 100vh !important;
        position: relative !important;
        margin: 0 !important;
    }
    @media (min-width: 1200px){
    
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }   
    }   @media (min-width: 768px){
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }
    }
    @media (min-width: 576px){
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }
    }
    @media only screen and (max-width: 500px) {
        .copyright{  
            background-color: rgba(88, 172, 225, 1)
        }
    }
    @media only screen and (max-width: 800px) {
        .innerContainer {
            border-radius: 7%;
            background-color: #fff;
            padding-right:20px;
            padding-bottom:20px;
            padding-top:20px;
            padding-left:10px;
            width: 50%;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 20%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 99;
        }
        .tituloPromocion, .infoPromocion{
            font-size: 20px !important;
        }
    }

</style>
