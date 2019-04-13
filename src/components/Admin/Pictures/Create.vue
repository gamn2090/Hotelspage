<template>
    <div class="content">
        <center><h3>Agregar Foto</h3></center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">                        
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen</label><br>
                            <input class="" type="file" @change="getFiles()" ref="files">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen</label><br>
                            <input class="form-control" type="text" v-model="name" placeholder="Habitación Matrimonial">
                        </div>                        
                    </div>                                        
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <select class="form-control" id="hotel" v-model="hotelSelected">
                                <option :selected="true" disabled value="">Seleccione un Hotel</option>
                                <option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</option>
                            </select>   
                        </div>    
                        <div class="col-md-6">
                            <input style="margin-top: 10%;" @click="addPicture" value="Agregar" class="btn btn-primary pill px-4 py-2">
                        </div>
                    </div>
                </div>                
            </div>
            </div>
        </center>              
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Promociones",
    data () {
      return {
        files: [],
        name: null,
        hotelSelected: null,
        hotels: [],
        picturesRef: db.child("fotos"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {
        getFiles() {
            this.files = this.$refs.files.files
        },    
        async addPicture() {
            const key = this.picturesRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("fotos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.name,
                    hotel: this.hotelSelected,                   
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.picturesRef.child(key).set(update)                               

            } catch (ex) {
                return console.error(ex)
            }
            alert("Imagen Agregada con éxito.")
        },
        async getHotels () {
            try {
                  this.hotels = (
                    await db
                    .child("tambohotels")                    
                    .once("value")                     
                ).val()
            } catch (ex) {
                return console.error(ex)
            }            
        }
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style lang="">
    
</style>
