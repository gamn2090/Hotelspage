<template>   
    <div class="site-section  beige-backgound">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 mb-5 mb-md-0">
                    <div class="img-border">
                        <!--https://www.youtube.com/watch?v=1_zdDMrlO_0 -->
                        <a @click="show()" style="cursor:pointer" class="popup-vimeo image-play">
                            <span class="icon-wrap">
                                <span class="icon icon-play"></span>
                            </span>
                            <img src='@/assets/img_2.jpg' alt="video image" class="img-fluid">
                        </a>
                    </div>                    
                </div>
                <div class="col-md-5 ml-auto">
                    <div class="section-heading text-left">
                        <h2 class="mb-5">Acerca de nosotros</h2>
                    </div>
                    <p class="mb-4">Contamos con 3 hoteles que ofrecen una excelente ubicación y le permitirán visitar cómodamente a pie los lugares mas atractivos de Miraflores, así como a los más destacados restaurantes de comida típica donde podrá disfrutar de la reconocida Gastronomía Peruana. La posición estratégica en el corazón de Miraflores, junto con el estilo único y la hospitalidad que siempre han caracterizado a Hoteles El Tambo, hacen de nuestros 3 hoteles un destino perfecto tanto para estancias de negocios como de placer.</p>
                    <p><a @click="show()" style="color:red;cursor:pointer" class="popup-vimeo text-uppercase">Ver video <span class="icon-arrow-right small"></span></a></p>
                </div>
            </div>
        </div>
        <modal :width="600" :height="338" name="video">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe  class="embed-responsive-item" src='https://www.youtube.com/embed/EsKOuvIw0pM?rel=0&amp;autoplay=1&amp;modestbranding=1&amp;showinfo=0&amp;showinfo=0&amp;listType=playlist&loop=1' id="video"  allowscriptaccess="always" allow="autoplay" allowfullscreen></iframe>
            </div>
        </modal>
    </div>
    
</template>

<script>
import VModal from 'vue-js-modal'

export default {
    name: "Nosotros",
    data () {
      return {
        
      }
    },
    methods: {
        show () {
            this.$modal.show('video');
        },
        hide () {
            this.$modal.hide('video');
        }
    }
}
</script>

<style scoped>

</style>