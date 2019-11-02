<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <Carousel :autoplay="true"
                      :per-page="this.sliders"
                      :loop="true"
                      :autoplayTimeout="2000"  >
                <Slide v-for="promosData in todasPromos" :key="promosData.key" class="media-with-text p-md-5 flex-item">                     
                    <router-link :to="{ name: 'reservas', params: { hotel: hotel, promo: promosData.key } }" >
                        <div class="img-border-sm mb-12">                        
                            <div href="#!" class="image-play">
                                <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                            </div>                        
                        </div> 
                    </router-link>
                    <center><h2 class="heading mb-0">{{promosData.name}}</h2></center>
                        
                    <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100)) }}</strong></center> 
                    </p>
                    <p v-else class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ promosData.precioDol }}</strong></center> 
                    </p>

                    <center><span v-if="promosData.fechaFin" class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFin}}</span>
                    <span v-else class="mb-3 d-block post-date">Por siempre</span></center>
                    <center><p>{{promosData.description}}</p></center>
                </Slide>                       
            </Carousel>            
        </div>
        
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    props: {
        todasPromos: {
            required: true
        },
        hotel: {
            required: true
        },
        sliders: {
            required: true
        }
    },
    components: {
        Carousel,
        Slide
    },
    name: "Promociones",
    data () {
      return {
        
      }        
    }
}
</script>

<style scoped>
    .img-fluid{
        height: 300px;
        width: 448px;
    }
</style>