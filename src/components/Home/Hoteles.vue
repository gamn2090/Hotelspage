<template>
    <div class="site-section bg-light beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5 bannerFont">Nuestros Hoteles</h2>
                </div>
            </div>            
            <div class="row">
                <div v-for="hotelData in hotels" :key="hotelData.key" class="col-md-6 col-lg-4 mb-5 ">
                    <router-link :to="{ name: 'hotel', params: { key: hotelData.key } }">
                        <div class="hotel-room text-center hotelItem">
                           
                            <img style="height:215px; width:100%" :src="hotelData.image || '../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid">
                            
                            <div class="hotel-room-body">
                                <h3 class="heading mb-0">{{hotelData.name}}</h3>
                                <span style="color:rgb(11,119,61);" class="mb-3 d-block post-date">{{hotelData.direccion}}</span>
                                <p style="color: grey">{{hotelData.descripcion}}</p>
                            </div>
                            <div class="verMas">
                                <span style="font-weight:bold;color:rgb(11,119,61)">Ver más</span>
                                <font-awesome-icon style="color:rgb(11,119,61)" icon="arrow-right" class="iconosHoteles"/>
                            </div>
                            
                        </div>
                    </router-link>               
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'

export default {
    name: "Hoteles",
    data () {
      return {
        files: [],
        hotel: null,
        hotels: [],
        hotelsOnChildAdded: null,
        hotelsOnChildRemoved: null,
        hotelsRef: db.child("tambohotels")
      }
    },
    methods:{               
        getHotels() {
           this.hotelsOnChildAdded = this.hotelsRef.on("child_added", snapshot => {
               const data = snapshot.val()
               const key = snapshot.key
               data.key = key
               this.hotels.push(data)
               //console.log(this.hotels)
           })

           this.hotelsOnChildRemoved = this.hotelsRef.on("child_removed", snapshot => {
               const index = this.hotels.findIndex(e => e.key == snapshot.key)
               this.hotels.splice(index, 1)
           })
        }
    },  
    created() {
        this.getHotels()
    },
    beforeDestroy() {
        this.hotelsRef.off("child_added", this.hotelsOnChildAdded)
        this.hotelsRef.off("child_removed", this.hotelsOnChildRemoved)
    }
}
</script>

<style scoped>
    .verMas{
        position:absolute;
        bottom:2%;
        left:7%;
    }
    .iconosHoteles{
        font-size: 15px !important;
    }
    .img-fluid{
        border-radius: 25px;
    }
    .hotelItem{
        border-radius: 25px;
        border: 2px solid rgb(11,119,61);
        height: 450px;
        position:relative;
    }
    .bannerFont{
        font-weight: bold;
    }
</style>