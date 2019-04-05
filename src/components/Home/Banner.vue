<template>
    <span>
        <div class="CanvasText">
            <h1 class="stroke">BIENVENIDO A HOTELES HOTEL</h1>
        </div>
        <vue-displacement-slideshow
            :images="images"
            :displacement="require('./../../../public/assets/images/displacement.png')"
            :intensity="0.2"
            :speedIn="1.4"
            :speedOut="1.4"
            ease="Expo.easeInOut"
            ref="slideshow" id="slider-vue">
        </vue-displacement-slideshow>
    </span>
</template>

<script>
//importo el owl carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import VueDisplacementSlideshow from "vue-displacement-slideshow";

export default {
    name: "Banner",
    data () {
      return {
        
      }
    },
    components: {
        VueDisplacementSlideshow,
    },
    computed: {
        images() {
            return [
                require("../../../public/assets/images/hero_1.jpg"),
                require("../../../public/assets/images/hero_2.jpg"),
                require("../../../public/assets/images/hero_3.jpg")
            ];
        }
    },
    methods: {
        init() {
            //We loop through all our images by calling the 'next' method of our component every 2 seconds
            setInterval(() => {
                this.$refs.slideshow.next();
            }, 2000);
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style>
    .vue-displacement-slideshow{
        height:100vh !important;  
        position: relative !important;      
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
    .stroke{
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
        font-weight: bolder;
    }
</style>