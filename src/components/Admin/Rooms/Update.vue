<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Actualizar Habitación</h3>
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
                            <label class="font-weight-bold">Habitación a editar</label><br>
                            <el-select @change="loadHab($event)" v-model="habSelected" placeholder="Debe Seleccionar un hotel">
                                <el-option
                                v-for="(item, key) in habs"
                                :key="key"
                                :label="item.nombre"
                                :value="key">
                                </el-option>
                            </el-select>
                        </div>                                                      
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la Habitación</label>
                            <el-input type="text" v-model="habitacion" placeholder="Habitación"></el-input>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la habitación</label><br>
                            <input type="file" @change="getFiles()" ref="files">
                            <img height="150" :src="this.hotelImage">
                        </div>
                    </div>                                                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Precio en Dolares</label><br>
                            <el-input-number v-model="precioDol" :min="0" :max="1000"></el-input-number>
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label><br>
                            <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="Describa su habitación"
                            v-model="descripcion">
                            </el-input>                            
                        </div>                                             
                    </div>                                   
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Cantidad de camas</label><br>
                            <el-input-number v-model="camas" :min="1" :max="100"></el-input-number>
                        </div> 
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Cantidad de habitaciones de este tipo</label><br>
                            <el-input-number v-model="habitaciones" :min="0" :max="100"></el-input-number>
                        </div>                       
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="editHab" value="Actualizar" class="btn btn-primary pill px-4 py-2">
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
        messaje: 'En este módulo de actualización de habitaciones, deberá primero seleccionar el hotel al que pertenece la habitación y posteriormente seleccionar la habitación a actaulizar, al hacer esto, se cargarán los datos de la habitación, deberá entonces proceder a actualizar los valores de los campos necesarios y presionar el botón de "Actualizar".',
        title: 'Actualizar Habitación',
        /*fin variables para info */
        files: [],
        nombre: null,
        oldImage: null,
        hotelImage: null,
        camas: null,
        hotelSelected: null,
        habitaciones: null,
        habitacion: null,
        descripcion: null,
        precioDol:null,        
        hotels: [],
        habs: [],
        habSelected: null,
        hotelSelected: null,
        habsRef: db.child("rooms"),
        hotelsRef: db.child("tambohotels")
      }
    },    
    methods:{ 
        getFiles() {
            this.files = this.$refs.files.files
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.hotelImage = fileReader.result
            })
            fileReader.readAsDataURL(this.files[0])
        },                
        async editHab() {
            
            try {
                const key = this.habSelected;
                const file = this.$refs.files.files[0]
                let url = null
                if(file)
                {
                    url = await (
                        await storage.ref("rooms")
                            .child(key)
                            .put(file)
                    ).ref.getDownloadURL() 
                }
                else
                {
                    url = this.oldImage
                }              
                const now = moment()
                const update = {
                    nombre: this.habitacion,
                    precioDol: this.precioDol,
                    hotel: this.hotelSelected,
                    camas: this.camas,
                    cantHabitaciones: this.habitaciones,
                    descripcion: this.descripcion,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.habsRef.child(key).set(update)
                this.hotels = []
                this.habs = []
                this.habitacion = null,
                this.habSelected = null,
                this.hotelSelected = null,
                this.habitaciones = null,
                this.precioDol = null,
                this.hotel = null,
                this.descripcion = null,
                this.image = null,
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
        async selectedHab ( habitacion ) {            
            try {
                let data = (
                    await db
                    .child("rooms")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == habitacion)
                    {    
                      this.habEditar = data[elem]; 
                    }
                } 
                this.oldImage =      this.habEditar.image
                this.hotelImage =    this.habEditar.image
                this.habitacion =    this.habEditar.nombre
                this.precioDol =     this.habEditar.precioDol
                this.descripcion =   this.habEditar.descripcion
                this.camas       =   this.habEditar.camas
                this.habitaciones =  this.habEditar.cantHabitaciones

            } catch (ex) {
                return console.error(ex)
            }            
        },       
        onChange ( event ) {
            this.getHabs ( this.hotelSelected )  
        },  
        loadHab ( event ) {
            this.selectedHab ( this.habSelected )  
        },
        success () {
            this.$message({
            message: 'Habitación actualizada satisfactoriamente.',
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
