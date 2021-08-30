<template>       
    <div class="site-section block-15  beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Titulo"]')}}</h2>
                </div>
            </div>
            <Carousel :autoplay="true"                    
                      :per-page="this.sliders"
                      :loop="true"
                      :autoplayTimeout="1500"  > 
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="virus-slash" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Bioseguridad"]')}}</span>
                        </div>
                    </div>
                </Slide >               
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="concierge-bell" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Recepcion"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="door-open" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Salidas"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="car" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Estacionamiento"]')}}</span>
                        </div>
                    </div>
                </Slide >                
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="volume-mute" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Ventanas"]')}}</span>
                        </div>
                    </div>
                </Slide >  
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="utensils" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Servicio"]')}}</span>
                        </div>
                    </div>
                </Slide >               
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="glass-cheers" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Minibar"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="desktop" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Business"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="wifi" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Wifi"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="cocktail" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Bebidas"]')}}</span>
                        </div>
                    </div>
                </Slide >
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="wind" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Aire"]')}}</span>
                        </div>
                    </div>
                </Slide >  
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="taxi" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Taxy"]')}}</span>
                        </div>
                    </div>
                </Slide >                
                <Slide >
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="text-center p-4 item">
                            <font-awesome-icon icon="map-marked-alt" class="display-4 mb-3 d-block text-primary"/>
                            <span class="caract-text">{{$t('HotelesPage["Sections"]["Caracteristicas"]["Iconos"]["Informacion"]')}}</span>
                        </div>
                    </div>
                </Slide >

            </Carousel>
        </div>
    </div>    
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

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
    .text-primary{
        color:rgb(11,119,61) !important;
    }
</style>