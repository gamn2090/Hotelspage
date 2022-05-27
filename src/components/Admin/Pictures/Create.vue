<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Agregar Imagen</h3>
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
                            <el-select id="hotel" v-model="hotelSelected">
                                <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                                <el-option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</el-option>
                            </el-select>   
                        </div>                      
                        
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción de la imagen</label><br>
                            <el-input v-model="name" placeholder="Breve descripción"></el-input>
                        </div>                        
                    </div>                                        
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">ImaSgen</label><br>
                            <input class="btn btn-primary pill px-4 py-2" type="file" @change="getFiles()" ref="files"><br>
                            <img height="150" :src="this.hotelImage">  
                        </div>
                        <div class="col-md-6">
                            <input v-if="this.imageInvalid == false" style="margin-top: 10%;" @click="addPicture" value="Agregar" class="btn btn-primary pill px-4 py-2">
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
        /*variables para la info */
        messaje: 'En este módulo podrá agregar imagenes a las galerías de los hoteles. Para realizar la acción mencionada, primero deberá seleccionar a que hotel agregará la imagen, posteriormente una pequeña descripción de la imagen y selecciona la imagen como tal, luego presiona "Agregar" y listo.',
        title: 'Agregar Imagen',
        /*fin variables para info */
        files: [],
        hotelImage: null,
        name: null,
        hotelSelected: null,
        hotels: [],
        imageInvalid : true,
        picturesRef: db.child("fotos"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {
        getFiles() {
            this.files = this.$refs.files.files
            if(this.files[0]['type'] != 'image/jpeg' && this.files[0]['type'] != 'image/png' && this.files[0]['type'] != 'image/jpg'){
                this.imageInvalid = true
                this.$message.error('Necesita cargar una imagen con extención png, jpeg o jpg');
            }else{
                this.imageInvalid = false
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.hotelImage = fileReader.result
                })
                fileReader.readAsDataURL(this.files[0])  
            }                      
        },    
        async addPicture() {
            const key = this.picturesRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("fotos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.name,
                    hotel: this.hotelSelected,                   
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix()
                }
                await this.picturesRef.child(key).set(update)                               

            } catch (ex) {                
                this.failure();
                return console.error(ex);
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
            message: 'Imagen agregada satisfactoriamente.',
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
