<template>
    <div class="content">
        <center><h3>Crear Habitacion</h3></center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la habitación</label>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Habitacion Matrimonial">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la habitación</label><br>
                            <input class="" type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                                        
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Cantidad de camas</label>
                            <input type="nuber" class="form-control" v-model="camas" placeholder="2">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <select class="form-control" id="hotel" v-model="hotelSelected">
                                <option :selected="true" disabled value="">Seleccione un Hotel</option>
                                <option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</option>
                            </select>   
                        </div>                    
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Cantidad de habitaciones</label>
                            <input type="number" v-model="habitaciones" class="form-control" placeholder="75">
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <textarea v-model="descripcion" name="message" cols="30" rows="2" class="form-control" placeholder="Describa su habitación"></textarea>
                        </div>                                             
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Precio en dolares de la habitación</label><br>
                            <input type="number" v-model="precioDol" class="form-control" placeholder="75">
                        </div>
                        <div class="col-md-6">
                            <input style="margin-top: 10%;" @click="addRoom" value="crear" class="btn btn-primary pill px-4 py-2">
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
        nombre: null,
        camas: null,
        hotelSelected: null,
        habitaciones: null,
        descripcion: null,
        precioDol:null,        
        hotels: [],
        roomsRef: db.child("rooms"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {
        getFiles() {
            this.files = this.$refs.files.files
        },    
        async addRoom() {
            const key = this.roomsRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("rooms")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    nombre: this.nombre,
                    camas: this.camas,
                    hotel: this.hotelSelected,
                    cantHabitaciones: this.habitaciones,
                    descripcion: this.descripcion,
                    precio: this.precioDol,                    
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.roomsRef.child(key).set(update)                               

            } catch (ex) {
                return console.error(ex)
            }
            alert("Habitación Agregada con éxito.")
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
