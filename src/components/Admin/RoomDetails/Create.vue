<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Crear Característica de Habitación</h3>
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
                        <div class="col-md-6 ">
                            <label class="font-weight-bold">Habitación a agregar característica</label><br>
                            <el-select v-model="habsSelected" placeholder="Debe Seleccionar un hotel">
                                <el-option :selected="true" disabled value="">Seleccione un habitación</el-option>
                                <el-option
                                v-for="(item, key) in habs"
                                :key="key"
                                :value="key"
                                :label="item.nombre">
                                {{item.nombre}}
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
                            <input style="margin-top: 10%;" @click="addCarac" value="Crear" class="btn btn-primary pill px-4 py-2">
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
        messaje: 'En este módulo le será posible crear características para una habitación en concreto.',
        /*fin variables para info */
        habsSelected: null,
        hotelSelected: null,
        /* */
        nombre: null,  
        hotels: [],              
        habs: [],              
        habsRef: db.child("rooms"),
        caracRef: db.child("habsCaracs"),
        hotelsRef: db.child("tambohotels")
      }
    },    
    methods:{                   
        async addCarac() {
            const key = this.caracRef.push().key
            try {                                
                const now = moment()
                const update = {
                    name: this.nombre,                    
                    hab: this.habsSelected,                   
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.caracRef.child(key).set(update)                               

            } catch (ex) {
                return console.error(ex)
                this.failure();
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
        onChange ( event ) {
            this.getHabs ( this.hotelSelected )  
        },
        success () {
            this.$message({
            message: 'característica creada satisfactoriamente.',
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
