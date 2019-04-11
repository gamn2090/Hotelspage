<template>
    <div class="content">
        <center><h3>Crear Promociones</h3></center> 
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la Promoción</label>
                            <input type="text" class="form-control" v-model="promo" placeholder="nombre hotel">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la promocion</label><br>
                            <input type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Fecha de Inicio</label>
                            <input type="text" v-model="fechaInicio" class="form-control" placeholder="01/04/2019">
                        </div>
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >fecha Final</label>
                            <input type="text" v-model="fechaFin" class="form-control" placeholder="01/05/2019">
                        </div>                        
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label>
                            <select id="hotel" v-model="hotelSelected">
                                <option selected disabled value="">Seleccione un Hotel</option>
                                <option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</option>
                            </select> 
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descuento</label>
                            <input type="number" v-model="descuento" class="form-control" placeholder="10">
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Precio en Dolares</label>
                            <input type="text" v-model="precioDol" class="form-control" placeholder="75">
                        </div>                                              
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <input  @click="addPromo" value="crear" class="btn btn-primary pill px-4 py-2">
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
        promo: null,
        precioDol: null,
        descuento: null,
        fechaInicio: null,
        fechaFin: null,
        hotelSelected : null,
        promos: [],
        tempArray: [],
        hotels: [],
        promosRef: db.child("promos"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {
        getFiles() {
            this.files = this.$refs.files.files
        },    
        async addPromo() {
            const key = this.promosRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("promos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.promo,
                    description: this.description,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.promosRef.child(key).set(update)
            } catch (ex) {
                return console.error(ex)
            }
            alert("Promoción Agregada con éxito.")
        },
        async getHotels () {
            try {
                  this.hotels = (
                    await db
                    .child("tambohotels")                    
                    .once("value")                     
                ).val()
                
                for (const key in this.hotels) 
                { 
                    console.log(key) 
                }
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
