<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <div v-if="promos !== null" class="nonloop-block-15 owl-carousel">
                <div v-for="promosData in promos" :key="promosData.key" class="media-with-text p-md-5">
                    <div class="img-border-sm mb-4">
                        <a href="#!" class="image-play">
                            <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" alt="" class="img-fluid">
                        </a>
                    </div>
                    <h2 class="heading mb-0">{{promosData.name}}</h2>
                    
                    <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                        Desde USD {{ promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100)) }} 
                    </p>
                    <p v-else class="mb-3 d-block post-date">
                        Desde USD {{ promosData.precioDol }} 
                    </p>

                    <span v-if="promosData.fechaFinal" class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFinal}}</span>
                    <span v-else class="mb-3 d-block post-date">Por siempre</span>
                    <p>{{promosData.description}}</p>
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
    name: "Promociones",
    data () {
      return {
        files: [],
        promos: [],
        promosRef: db.child("promos")
      }    
    },
    methods: {
        async getPromos() {
           try {
                let todasPromos = (
                    await db
                    .child("promos")
                    .once("value")
                ).val()

                for (let elem in todasPromos) {
                    if(todasPromos[elem].hotel == this.$route.params.key)
                        this.promos.push(todasPromos[elem]);  
                        
                    console.log(this.promos)
                }    
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