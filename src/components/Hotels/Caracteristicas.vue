<template>       
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5">Características de los Hotel</h2>
                </div>
            </div>
            <Carousel :autoplay="true"                    
                      :per-page="this.sliders"
                      :loop="true"
                      :autoplayTimeout="1500"  >
                <Slide > 
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-pool display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Piscina</h2>
                        </div>
                    </div>
                </Slide> 
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-desk display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Recepcionistas</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Salidas de Emergencia</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-parking display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Estacionamiento</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-hair-dryer display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Secador de Cabello</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-minibar display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Minibar</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-drink display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Bebidas Nacionales e importadas</h2>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <span class="flaticon-cab display-3 mb-3 d-block text-primary"></span>
                            <h2 class="h5">Recogida en Aeropuerto</h2>
                        </div>
                    </div>
                </Slide >
            </Carousel>
        </div>
    </div>    
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "Caracteristicas",
    components: {
        Carousel,
        Slide
    },
    data () {
      return {
        sliders: null,
      }
    },   
    async created() {
        this.sliders = Math.round(window.screen.width/255)   
        console.log(this.sliders)         
    }
}
</script>

<style scoped>
    
</style>