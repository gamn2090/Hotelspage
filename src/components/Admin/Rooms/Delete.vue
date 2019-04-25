<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Eliminar Habitación</h3>
            <i @click="showInfo()" class="el-icon-question help-icon"></i>
        </center>
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
        /*variables para la info */
        messaje: 'En este módulo de eliminación de habitaciones, deberá primero seleccionar el hotel al que pertenece la habitación y posteriormente seleccionar la habitación a eliminar, presionando el boton "Eliminar" se procederá a eliminar la habitación.',
        title: 'Eliminar habitación',
        /*fin variables para info */
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

            this.$confirm('Esto eliminará la habitación de manera permanente, ¿desea continuar?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
                }).then(() => {
                    this.habsRef.child(key).remove()
                    this.habs = []
                    this.success();
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Eliminación cancelada por el usuario'
                });          
            });         
                        
        },
        success () {
            this.$message({
            message: 'Habitación eliminada satisfactoriamente.',
            type: 'success'
            });
        },
        failure () {
            this.$message.error('Ha Ocurrido un error, intente de nuevo más tarde');
        },
        showInfo() {
            this.$alert(this.messaje, this.title, {
            confirmButtonText: 'OK',          
            });
        }
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style lang="">
    
</style>
