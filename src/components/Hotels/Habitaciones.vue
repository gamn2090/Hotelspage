<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>{{$t('HotelesPage["Sections"]["Habitaciones"]["Tutilo"]')}}</h2>
                </div>
            </div>
            <Carousel :autoplay="true"
                      :per-page-custom=[[480,1],[1080,2]]
                      :loop="true"
                      :autoplayTimeout="2000" >
                <Slide v-for="(habsData, key) in habs" :key="key" class="media-with-text p-md-5 flex-item">
                    <router-link :to="{ name: 'habitacion', params: { hotel: hotel, hab: key }, hash: '#detallesHabitacion' }" >
                        <div class="img-border-sm mb-12 zoom">
                            <div class="image-play">
                                <img :src="habsData.image || '../../../public/assets/images/img_1.jpg'" alt="" class="img-fluid">
                            </div>
                        </div>
                    </router-link>
                        <h2 v-if="$i18n.locale == 'es'" class="heading mb-0"><a href="#!">{{habsData.nombre}}</a></h2>
                        <h2 v-else class="heading mb-0"><a href="#!">{{habsData.nombre_en}}</a></h2>
                        <span class="mb-3 d-block post-date">Desde USD {{habsData.precioDol}} ó S/ {{habsData.precioPen}}</span>                    
                        <span class="mb-3 d-block post-date">{{habsData.cantidad}}</span>
                </Slide>                       
            </Carousel>            
        </div>
        
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
     props: {
        habs: {
            required: true
        },
        hotel: {
            required: true
        }
    },
    components: {
        Carousel,
        Slide
    },
    name: "Habitaciones",
    data () {
      return {       
        
      }    
    }, 
    created () {
        for (const key in this.habs) { console.log(key) }            
    }
}
</script>

<style scoped>
    .img-fluid{
        height: 300px;
        width: 448px;
    }    
    .flex-item{
        text-align: center;
    }
    .zoom{
        transition: transform 1s; /* Animation */
    }
    .zoom:hover {
        transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    }
</style>