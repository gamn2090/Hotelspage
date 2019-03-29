<template>
    <div class="site-section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5">Nuestros hoteles</h2>
                </div>
            </div>
            <!--<div>
                <label for="">
                    Hotel
                </label>
                <input type="text" v-model="hotel">
                <br><br>
                <label for="image">Imagen</label>
                <input type="file" @change="getFiles()" ref="files">
                <button @click="addHotel">Add</button>
            </div> -->
            <div class="row">
                <div v-for="hotelData in hotels" :key="hotelData.key" class="col-md-6 col-lg-4 mb-5">
                    <router-link :to="{ name: 'hotel', params: { key: hotelData.key } }">
                        <div class="hotel-room text-center">
                            <a href="#!" class="d-block mb-0 thumbnail">
                                <img style="height:215px; width:300px" :src="hotelData.image || '../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid">
                            </a>
                            <div class="hotel-room-body">
                                <h3 class="heading mb-0"><a href="#!">{{hotelData.name}}</a></h3>
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
import moment from "moment"

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
        getFiles() {
            this.files = this.$refs.files.files
        },
        // Un sugerencia que te doy es que cuando uses las funciones de firebase que devuelven promesas, uses async/await, es cosa de gente praah
        // Las que devuelven promesas son: set, update, once...
        // Te encontrarás el caso donde necesitarás primero tener el key para poder guardar luego...
        // Cuando necesites actualizar varios nodos al tiempo, siempre pasa...
        async addHotel() {
            // puedes hacer esto...
            const key = this.hotelsRef.push().key
            try {
                // DINDOOOOOOOO Ahora si a ver...
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("tambohoteles")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.hotel,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.hotelsRef.child(key).set(update)
                // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
            } catch (ex) {
                return console.error(ex)
            }
            alert("Agregado con éxito.")
        },
        getHotels() {
           this.hotelsOnChildAdded = this.hotelsRef.on("child_added", snapshot => {
               const data = snapshot.val()
               const key = snapshot.key
               data.key = key
               this.hotels.push(data)
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
    
</style>