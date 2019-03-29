<template>
    <span >        
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
    name: "Hotel",
    data () {
      return {
        hotel : null,
        fotos : [],
        promociones : []
      }    
    },
    methods: {
        async getHotelData() {
           try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == this.$route.params.key)
                        this.hotel = data[elem];                    
                }           
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },
    async created () {
        await this.getHotelData()    
    }  
}
</script>

<style scoped>
    .overlay{
        position: absolute;
        background-color: rgba(0,0,0,0.5);
    }
</style>