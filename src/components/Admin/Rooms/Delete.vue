<template>
    <div class="content">
        <center><h3>Eliminar habitación</h3></center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <el-select @change="onChange($event)" id="hotel" v-model="hotelSelected">
                                <el-option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</el-option>
                            </el-select> 
                        </div>     
                        <div class="col-md-6">
                            <label class="font-weight-bold">Habitación a eliminar</label><br>
                            <el-select id="hotel" v-model="habitacion">
                                <el-option v-for="(hab, key) in habs" :key="key" :value="key" :label="hab.nombre">{{hab.nombre}} - {{hab.precio}}</el-option>
                            </el-select> 
                        </div>                                          
                    </div>
                    
                    <div class="row form-group">
                       
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="deleteHab(habitacion)" value="Eliminar" class="btn btn-primary pill px-4 py-2">
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
    name: "Habitaciones",
    data () {
      return {
        habitacion: null,
        hotelSelected : null,
        hotels: [],
        habs: [],
        habsRef: db.child("rooms"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {  
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
        },
        async getHabs ( hotel ) {
            try {
                  this.habs = (
                    await db
                    .child("rooms")  
                    .orderByChild('hotel')
                    .equalTo(hotel)                  
                    .once("value")                     
                ).val()
            } catch (ex) {
                return console.error(ex)
            }            
        },
        onChange ( event ) {
            this.getHabs ( this.hotelSelected )  
        },
        deleteHab:function(key){
            if(confirm('¿Está seguro que desea eliminar esta habitación'))
            {    
                this.habsRef.child(key).remove()
                this.habs = []
                alert("Habitación eliminada con éxito.")
            }
            else 
            {
                alert("Eliminación cancelada por el usuario")
            }
        },
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style lang="">
    
</style>
