<template>
    <span >
        <div class="CanvasText">
            <h1 v-if="routeName" >{{ routeName }}</h1>
            <h1 v-else >BIENVENIDO A HOTELES HOTEL</h1>            
        </div>
        <div class="display-dark">                
        </div>
        <Carousel class="Carousel" :autoplay="true"
                      :per-page="1"
                      :loop="true"
                      :autoplayTimeout="5000"
                      :paginationEnabled="false" >
            <Slide class="media-with-text flex-item">
                <div class="img-border-sm mb-4 zoom">
                    <div class="image-play">
                        <img src="@/../public/assets/images/hero_1.jpg" alt="" class="img-fluid">
                    </div>
                </div>                
            </Slide> 
            <Slide class="media-with-text flex-item">
                <div class="img-border-sm mb-4 zoom">
                    <div class="image-play">
                        <img src="@/../public/assets/images/hero_2.jpg" alt="" class="img-fluid">
                    </div>
                </div>                
            </Slide> 
            <Slide class="media-with-text flex-item">
                <div class="img-border-sm mb-4 zoom">
                    <div class="image-play">
                        <img src="@/../public/assets/images/hero_3.jpg" alt="" class="img-fluid">
                    </div>
                </div>                
            </Slide>                       
        </Carousel>
    </span>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "Banner",
    data () {
      return {
        
      }
    },
     props: {
        routeName: {
            required: false
        }        
    },
    components: {
        Carousel,
        Slide
    }
};
</script>

<style>
    .Carousel{
        height: 100vh !important;
        position: relative !important;
        margin: 0 !important;
    }
    h1{
        color: white !important;
    }
    .CanvasText {
        position: absolute;
        top: 50vh;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: justify;
        z-index: 20;
        font-family:fantasy;
    }    
    .display-dark{
        background:#000;
        position:absolute;
        opacity:0.4;
        width:100%;
        height: 100vh;
        top:0;
        z-index:1;
    }
    
</style>