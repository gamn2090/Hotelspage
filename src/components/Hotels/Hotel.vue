<template>
    <span>
        <div class="py-5 upcoming-events" :style="{ 'background-image': 'url(' + hotel.image + ')', 'background-attachment': 'fixed', 'height':'300px', 'background-size': 'cover','filter': 'brightness(50%)' }">
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
import { db, storage } from '@/firebase.js'
import moment from "moment"

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
                console.log(this.hotel) 
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },
    async created () {
        //console.log( this.$route.params.key);
        await this.getHotelData()    
    }  
}
</script>

<style scoped>
    
</style>