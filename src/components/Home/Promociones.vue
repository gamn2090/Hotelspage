<template>
    <div class="site-section block-15  beige-backgound">
        <div class="container">
            <div class="row" style="margin-right:0;margin-left:0">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5 bannerFont">{{$t('Promociones["Titulo"]')}}</h2>
                </div>
            </div>
            <Carousel v-if="this.promos != null" :autoplay="true"                    
                      :per-page="1"
                      :loop="true"
                      :autoplayTimeout="8000"  >
                <Slide v-for="promosData in promos" :key="promosData.key" class="promocionesTambo"> 
                    <!-- <router-link :to="{ name: 'hotel', params: { key: promosData.hotel} }" > -->
                    <div class="img-border-sm mb-12">                        
                        <div href="#!" class="image-play">
                            <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                        </div>                        
                    </div>
                
                    <div class="innerContainer"><!--vertical-align -->
                        <div v-if="$i18n.locale == 'es'" class="row align-items-center justify-content-center "  >
                            <div class="col-md-12 text-center onTop" data-aos="fade">
                                <h2 class="heading mb-0 tituloPromocion">{{promosData.name}}</h2><br><br>
                                <h5 class="mb-3 d-block post-date infoPromocion" v-html="promosData.description">{{promosData.description}}</h5>
                                <br><br>
                                <div class="price">
                                    S./ {{promosData.precioPen}}
                                </div>
                            </div>
                        </div>
                        <div v-else class="row align-items-center justify-content-center "  >
                            <div class="col-md-12 text-center onTop" data-aos="fade">
                                <h2 class="heading mb-0 tituloPromocion">{{promosData.name_en}}</h2><br><br>
                                <h5 class="mb-3 d-block post-date infoPromocion" v-html="promosData.description_en">{{promosData.description_en}}</h5>
                                <br><br>
                                <div class="price">
                                    S./ {{promosData.precioPen}}
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="innerContainerBottom"><!--vertical-align -->
                        <div class="row align-items-center justify-content-center " >
                            <div v-if="$i18n.locale == 'es'" class="col-md-12 text-center onTop">
                                <h5 class="mb-3 d-block post-date infoPromocion terminos" v-html="promosData.terminos">{{promosData.terminos}}</h5><br><br>
                            </div>
                            <div v-else class="col-md-12 text-center onTop">
                                <h5 class="mb-3 d-block post-date infoPromocion terminos" v-html="promosData.terminos_en">{{promosData.terminos_en}}</h5><br><br>
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
    .price{
        background-color: rgb(167, 91, 31);
        padding-top: 20px;
        padding-bottom: 20px;
        color: white;
        font-size: 20px;
        font-weight: bolder;
        margin-left: 30%;
        margin-right: 30%;
        border-radius: 20px;
    }
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
        height: 100%;
        border-radius: 7%;
        background-color: rgba(252, 252, 252,.8);
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
    .terminos{
        font-size: 10px !important;
    }
    .innerContainerBottom {
        height: 15%;
        background-color: rgb(252, 252, 252);
        padding-right:20px;
        padding-bottom:20px;
        padding-top:20px;
        padding-left:10px;
        width: 100%;
        margin: 0;
        position: absolute;
        bottom: -10%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 99;
    }
    .tituloPromocion{
        padding-top:10px;
        font-size: 19px;
        color: rgb(167,91,31) !important;
    }   
    .infoPromocion{
        font-size: 16px;
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
        .infoPromocion{
            padding-top:10px;
            font-size: 14px ;
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
        .infoPromocion{
            padding-top:10px;
            font-size: 12px ;
        }
        .innerContainerBottom {
            height: 17%;            
        }
        .terminos{
            font-size: 8px !important;
            color: black;
        }
    }
    @media only screen and (max-width: 900px) {
        .innerContainer {
            border-radius: 7%;
            width: 50%;
            margin: 0;
            top: 50%;
            left: 30%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        } 
        .price{
            font-size:16px;
        }
        .innerContainer h5{
            font-size:11px;
        }   
        .tituloPromocion, .infoPromocion{
            padding-top:10px;
            font-size: 16px ;
        }
        .terminos{
            font-size: 10px !important;
        }
    }

</style>
