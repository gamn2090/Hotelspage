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
                            <img src='@/assets/TERRAZA_TAMBO.png' alt="video image" class="img-fluid">
                        </a>
                    </div>                    
                </div>
                <div class="col-md-5 ml-auto">
                    <div class="section-heading mb-5 text-center">
                        <h2 class="mb-5 bannerFont">{{$t('Nosotros["Titulo"]')}}</h2>
                    </div>
                    <span v-html="$t('Nosotros.Texto')"></span>
                    <p><a @click="show()" style="color:red;cursor:pointer" class="popup-vimeo text-uppercase">{{$t('Nosotros["video"]')}} <span class="icon-arrow-right small"></span></a></p>
                </div>
            </div>
        </div>
        
        <modal style="z-index:999" :width="600" :height="338" name="video">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe  class="embed-responsive-item" src='https://www.youtube.com/embed/TYRuw4YxpTM?rel=0&amp;autoplay=1&amp;modestbranding=1&amp;showinfo=0&amp;showinfo=0&amp;listType=playlist&loop=1' id="video"  allowscriptaccess="always" allow="autoplay" allowfullscreen></iframe>
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
.mb-5{
    margin-bottom:10px !important;
}
</style>