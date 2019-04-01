<template>
    <span v-if="hotel">        
        <div class="py-5 upcoming-events title" :style="{ 'background-image': 'url(' + hotel.image + ')', 'background-attachment': 'fixed', 'height':'100vh', 'background-size': 'cover', 'background-position': 'center center', 'position':'relative', 'filter': 'brightness(0.50)' }">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h2 class="text-white"></h2>
                    </div>
                    <div class="col-md-6">
                        <span class="caption"></span>
                    </div>
                </div>
            </div>
        </div>        
    </span>
</template>

<script>
import { db } from '@/firebase.js'

export default {
    props: {
        hotel: {
            required: true
        }
    },
    name: "Hotel",
    data () {
      return {
        
      }   
    }
}
</script>

<style scoped>
    .overlay{
        position: absolute;
        background-color: rgba(0,0,0,0.5);
    }
</style>