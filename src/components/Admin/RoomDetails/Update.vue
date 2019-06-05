<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Actualizar Característica de Habitación</h3>
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
                            <label class="font-weight-bold">Habitación a agregar característica</label><br>
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
                    <div class="row form-group">
                        <div class="col-md-6 offset-md-3">
                            <label class="font-weight-bold">Habitación a agregar característica</label><br>
                            <el-select @change="loadCaracs($event)" v-model="caracSelected" placeholder="Debe Seleccionar un hotel">
                                <el-option :selected="true" disabled value="">Seleccione una característica</el-option>
                                <el-option
                                v-for="(item, key) in caracs"
                                :key="key"
                                :label="item.name"
                                :value="key">
                                {{item.name}}
                                </el-option>
                            </el-select>
                        </div>     
                    </div>                                                         
                    <div class="row form-group">
                        <div class="col-md-6 offset-md-3">
                            <label class="font-weight-bold" >Característica</label><br>
                            <el-input v-model="nombre" ></el-input>
                        </div>                                                                 
                    </div>
                               
                    <div class="row form-group">                        
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="editCarac" value="Actualizar" class="btn btn-primary pill px-4 py-2">
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
    data () {
      return {
        /*variables para la info */
        messaje: 'En este módulo le será posible actualizar las características de las habitaciones que haya creado.',
        title: 'Actualizar Promoción',
        /*fin variables para info */
        hotel: null,
        habsSelected: null,
        hotelSelected: null,
        caracSelected: null,
        /* */
        caracteristica: null,
        nombre: null,  
        hotels: [],              
        habs: [],              
        caracs: [],              
        habsRef: db.child("rooms"),
        caracRef: db.child("habsCaracs"),
        hotelsRef: db.child("tambohotels")
      }
    },    
    methods:{                   
        async editCarac() {            
            try {
                const key = this.caracSelected;                
                const now = moment()
                const update = {
                    name: this.nombre,  
                    hab: this.habsSelected, 
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix()                   
                }
                await this.caracRef.child(key).set(update)
                this.hotels = []
                this.habs = []
                this.caracs = []
                this.caracSelected = []
                this.hotelSelected = []
                this.habsSelected = []
                this.nombre = null,                
                await this.getHotels()

            } catch (ex) {
                return console.error(ex)
            }
            this.success();           
        
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
        async selectedCarac ( carac ) {            
            try {
                let data = (
                    await db
                    .child("habsCaracs")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == carac)
                    {    
                      this.caracteristica = data[elem]; 
                    }
                } 
                this.nombre =      this.caracteristica.name                

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
        loadCaracs ( event ) {
            this.selectedCarac ( this.caracSelected )  
        },        
        success () {
            this.$message({
            message: 'Promoción actualizada satisfactoriamente.',
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

<style scoped>
   
</style>
