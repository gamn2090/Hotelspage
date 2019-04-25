<template>
    <span >
        <div class="CanvasText">
            <h1 v-if="routeName" >{{ routeName }}</h1>
            <h1 v-else >BIENVENIDO A HOTELES HOTEL</h1>            
        </div>
        <div class="display-dark">                
            </div>
        <vue-displacement-slideshow
            :images="images"
            :displacement="require('@/../dist/displacement.png')"
            :intensity="0.2"
            :speedIn="1.4"
            :speedOut="1.4"
            ease="Expo.easeInOut"
            ref="slideshow" id="slider-vue">
            
        </vue-displacement-slideshow>
    </span>
</template>

<script>

import VueDisplacementSlideshow from "vue-displacement-slideshow";

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
        VueDisplacementSlideshow,
    },
    computed: {
        images() {
            return [
                require("@/../dist/hero_1.jpg"),
                require("@/../dist/hero_2.jpg"),
                require("@/../dist/hero_3.jpg")
            ];
        }
    },
    methods: {
        init() {
            //We loop through all our images by calling the 'next' method of our component every 2 seconds
            setInterval(() => {
                this.$refs.slideshow.next();
            }, 3000);
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