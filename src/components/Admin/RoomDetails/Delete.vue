<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Eliminar Característica</h3>
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
                            <el-select @change="onChange($event)" id="hotel" placeholder="Seleccione un hotel" v-model="hotelSelected">
                                <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                                <el-option 
                                    v-for="(hotel, key) in hotels" 
                                    :key="key" 
                                    :value="key" 
                                    :label="hotel.name">
                                    {{hotel.name}}
                                </el-option>
                            </el-select> 
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Habitación a eliminarle característica</label><br>
                            <el-select @change="loadHab($event)" v-model="habsSelected" placeholder="Debe Seleccionar un hotel">
                                <el-option :selected="true" disabled value="">Seleccione un habitación</el-option>
                                <el-option
                                v-for="(item, key) in habs"
                                :key="key"
                                :label="item.nombre"
                                :value="key">
                                {{item.nombre}}
                                </el-option>
                            </el-select>
                        </div>          
                                                             
                    </div>
                </div>
            </div>
            <el-row :gutter="10">
                    <label class="font-weight-bold">Características a eliminar</label><br>
                    <el-col :md="24">
                        <div class="row no-gutters"> 
                            <ul>
                                <li style="cursor:pointer" v-for="(carac, key) in caracs" :key="key" @click="deleteCarac(key)">
                                    {{carac.name}}
                                </li>
                            </ul>                                                  
                        </div> 
                    </el-col>                                   
                </el-row>            
            </div> 
        </center>              
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Imagenes",
    data () {
      return {
        /*variables para la info */
        messaje: 'En este módulo podrá eliminar las Características de las habitaciones que haya creado.',
        /*fin variables para info */
        caracs: null,
        hotelSelected : null,
        habsSelected : null,
        hotels: [],
        habs: [],
        CaracRef: db.child("habsCaracs"),
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
        async getHabs( hotel ) {
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
        async getCaracs ( hab ) {
            try {
                  this.caracs = (
                    await db
                    .child("habsCaracs")  
                    .orderByChild('hab')
                    .equalTo(hab)                  
                    .once("value")                     
                ).val()
            } catch (ex) {
                return console.error(ex)
            }            
        },
        onChange ( event ) {
            this.getHabs ( this.hotelSelected )  
        },
        loadHab ( event ) {
            this.getCaracs ( this.habsSelected )  
        },
        deleteCarac:function(key){

            this.$confirm('Esto eliminará la característica de manera permanente, ¿desea continuar?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
                }).then(() => {
                    console.log('entre')
                    this.CaracRef.child(key).remove()
                    console.log('eliminé')                    
                    this.habs = []
                    console.log('inicialice las habs')                    
                    this.hotels = []
                    console.log('inicialice los hoteles')                    
                    this.success();
                    this.getHotels()
                    console.log('mostre success')
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Eliminación cancelada por el usuario'
                });          
            });  

        },
        success () {
            this.$message({
            message: 'Característica eliminada satisfactoriamente.',
            type: 'success'
            });
            this.getFotos ( this.hotelSelected )  
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
