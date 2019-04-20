<template>
    <div class="content">
        <center><h3>Editar Hotel</h3></center>
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
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Nombre del hotel</label>
                            <el-input type="text" v-model="hotel" placeholder="hotel uno"></el-input>
                        </div>                        
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Latitud</label>
                            <el-input v-model="latitud" placeholder="-72.225486"></el-input>
                        </div>
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Longitud</label>
                            <el-input v-model="longitud" placeholder="-72.225486"></el-input>
                        </div>                        
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <el-input type="textarea" v-model="descripcion" placeholder="Describa su hotel"></el-input>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Dirección</label>
                            <el-input type="textarea" v-model="direccion" placeholder="Dirección exacta de su hotel"></el-input>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen del hotel</label><br>
                            <input class="btn btn-primary pill px-4 py-2" type="file" @change="getFiles()" ref="files">
                        </div>
                        <div class="col-md-6">
                            <br>
                            <input @click="editHotel" value="Editar" class="btn btn-primary pill px-4 py-2">
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
        files: [],
        hotel: null,
        oldImage: null,
        latitud: null,
        hotelSelected: null,
        longitud: null,
        descripcion: null,
        direccion: null,
        hotelEditar : null,
        hotels: [],        
        hotelsRef: db.child("tambohotels")
      }
    },    
    methods:{ 
        getFiles() {
            this.files = this.$refs.files.files
        },                
        async editHotel() {
            if(confirm('¿Está seguro que desea editar este hotel'))
            {
                try {
                    const key = this.hotelSelected;
                    const file = this.$refs.files.files[0]
                    let url = null
                    if(file)
                    {
                        url = await (
                            await storage.ref("tambohoteles")
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
                        name: this.hotel,
                        image: url,
                        createdAt: now.format("DD/MM/YYYY"),
                        latitud: this.latitud,
                        longitud: this.longitud,
                        descripcion: this.descripcion,
                        direccion: this.direccion,                    
                        createdAtUnix: now.unix() 
                    }
                    await this.hotelsRef.child(key).set(update)
                    this.hotels = []
                    await this.getHotels()
                    // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
                } catch (ex) {
                    return console.error(ex)
                }
                alert("Hotel editado con éxito.")
            }
            else 
            {
                alert("Edición cancelada por el usuario")
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
        async selectedHotel ( hotel ) {            
            try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == hotel)
                    {    
                      this.hotelEditar = data[elem]; 
                    }
                } 

                this.oldImage = this.hotelEditar.image,
                this.hotel = this.hotelEditar.name,
                this.latitud= this.hotelEditar.latitud,
                this.longitud= this.hotelEditar.longitud,
                this.descripcion= this.hotelEditar.descripcion,
                this.direccion= this.hotelEditar.direccion,

                console.log(this.oldImage)
            } catch (ex) {
                return console.error(ex)
            }            
                //console.log(this.hotels)                      
        },       
        onChange ( event ) {
            this.selectedHotel ( this.hotelSelected )  
        },        
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style scoped>
   
</style>
