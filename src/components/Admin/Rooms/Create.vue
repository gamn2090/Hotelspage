<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Crear Habitación</h3>
            <i @click="showInfo()" class="el-icon-question help-icon"></i>
        </center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la habitación</label>
                            <el-input v-model="nombre" placeholder="Habitacion Matrimonial"></el-input>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la habitación</label><br>
                            <input class="" type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                                        
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Cantidad de camas</label><br>
                            <el-input-number v-model="camas" placeholder="2"></el-input-number>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <el-select id="hotel" v-model="hotelSelected">
                                <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                                <el-option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</el-option>
                            </el-select>   
                        </div>                    
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Cantidad de habitaciones</label><br>
                            <el-input-number v-model="habitaciones" placeholder="75"></el-input-number>
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <el-input type="textarea" v-model="descripcion" placeholder="Describa su habitación"></el-input>
                        </div>                                             
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Precio en dolares de la habitación</label><br>
                            <el-input-number v-model="precioDol" placeholder="75"></el-input-number>
                        </div>
                        <div class="col-md-6">
                            <input style="margin-top: 10%;" @click="addRoom" value="Crear" class="btn btn-primary pill px-4 py-2">
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
        messaje: 'En este módulo podrá crear habitaciones para su hotel, primero debe ingresar el nombre de la habitación, elegir una imagen que la represente, introducir la cantidad de camas que tendrá, a que hote pertenecerá esta habitación, la cantidad de este tipo de habitaciones que tiene el hotel, una descripción de la misma y el precio en dolares de la misma, ya luego de esto al precionar el botón "Crear" se procederá a almacenar la información.',
        title: 'Crear Habitación',
        /*fin variables para info */
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
                this.failure();
            }
            this.success();
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
        success () {
            this.$message({
            message: 'Habitación creada satisfactoriamente.',
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
