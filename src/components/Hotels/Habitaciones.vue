<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Descubra nuestras habitaciones</h2>
                </div>
            </div>
            <div v-if="habs !== null" class="nonloop-block-15 owl-carousel">
                <div v-for="habsData in habs" :key="habsData.key" class="media-with-text p-md-5">
                    <div class="img-border-sm mb-4">
                        <a href="#!" class="image-play">
                            <img :src="habsData.image || '../../../public/assets/images/img_1.jpg'" alt="" class="img-fluid">
                        </a>
                    </div>
                    <h2 class="heading mb-0"><a href="#!">{{habsData.tipo}}</a></h2>
                    <span class="mb-3 d-block post-date">{{habsData.cantidad}}</span>                    
                    <p>{{habsData.descripcion}}</p>
                </div>                       
            </div>
            <div v-else>
                <h2>Por los momentos no hay promociones en este hotel</h2>
            </div>
        </div>
        
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'

export default {
    name: "Habitaciones",
    data () {
      return {
        files: [],
        habs: [],
        habsRef: db.child("habitaciones")
      }    
    },
    methods: {
        async getHabs() {
           try {
                let todasHabs = (
                    await db
                    .child("habitaciones")
                    .once("value")
                ).val()

                for (let elem in todasHabs) {
                    if(todasHabs[elem].hotel == this.$route.params.key)
                        this.habs.push(todasHabs[elem]);  
                        
                    console.log(todasHabs.hotel)
                }    
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },  
    async created() {
        await this.getHabs()       
    },
    updated () {        
        if ($('.nonloop-block-15').length > 0) { $('.nonloop-block-15').owlCarousel({ center: false, items: 1, loop: true, stagePadding: 0, autoplay: true, margin: 20, nav: true, dots: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'], responsive: { 600: { margin: 20, stagePadding: 0, items: 1, nav: false, dots: true }, 1000: { margin: 20, stagePadding: 0, items: 2, nav: true, dots: true }, 1200: { margin: 20, stagePadding: 0, items: 3, nav: true, dots: true } } }); }
    }
}
</script>

<style scoped>
    
</style>