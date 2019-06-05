<template>
    <div class="content">        
        <center>
            <h3 style="display:inline-block">Crear Hotel</h3>
            <i @click="showInfo()" class="el-icon-question help-icon"></i>
        </center>            
        <br>
        <div class="containerAdmin">
            <el-row :gutter="20">
                <el-col :xs="22" :md="10" :offset="1">
                    <label class="font-weight-bold">Nombre del hotel</label>
                    <el-input v-model="hotel" placeholder="nombre hotel"></el-input>
                </el-col>
                
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Imagen del hotel</label><br>
                    <input type="file" @change="getFiles()" ref="files">
                    <img height="150" :src="this.hotelImage">
                </el-col>                
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold" >Latitud</label>
                    <el-input v-model="latitud" placeholder="-72.225486"></el-input>
                </el-col>
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold" >Longitud</label>
                    <el-input v-model="longitud" placeholder="-72.225486"></el-input>
                </el-col>                
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Descripción</label>
                    <el-input type="textarea" v-model="descripcion" placeholder="Describa su hotel"></el-input>
                </el-col>
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Dirección</label>
                    <el-input type="textarea" v-model="direccion" placeholder="Dirección exacta de su hotel"></el-input>
                </el-col>                
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Teléfono</label>
                    <el-input v-model="telefono" placeholder="Coloque su número de teléfono"></el-input>
                </el-col>
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Correo</label>
                    <el-input type="email" v-model="correo" placeholder="Dirección de correo electrónica"></el-input>
                </el-col>                
            </el-row>
            <br>
            <el-row :gutter="20">               
                <el-col :xs="8" :md="12" :offset="8" >
                    <input @click="addHotel" value="crear" class="btn btn-primary pill px-4 py-2">
                </el-col>                
            </el-row>
        </div>
    </div>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    data () {
      return {
        /*variables para la info */
        messaje: 'Este módulo funciona para crear los hoteles de su cadena. Primero deberá introducir el nombre de su hotel, seleccionar una imagen para que se visualize en la vista para el público, la latitud y longitud, se la dará el Google Maps, colocando la dirección exacta de su hotel en el mismo, luego deberá introducir una pequeña reseña de su hotel, resaltando las bondades del mismo, así mismo deberá introducir la dirección exacta donde está ubicado y por último un teléfono de frontdesk y el correo corporativo del hotel.',
        title: 'Crear Hotel',
        /*fin variables para info */
        files: [],
        hotel: null,
        latitud: null,
        hotelImage: null,
        telefono: null,
        correo: null,
        longitud: null,
        descripcion: null,
        direccion: null,
        hotels: [],
        hotelsOnChildAdded: null,
        hotelsOnChildRemoved: null,
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
        // Un sugerencia que te doy es que cuando uses las funciones de firebase que devuelven promesas, uses async/await, es cosa de gente praah
        // Las que devuelven promesas son: set, update, once...
        // Te encontrarás el caso donde necesitarás primero tener el key para poder guardar luego...
        // Cuando necesites actualizar varios nodos al tiempo, siempre pasa...
        async addHotel() {            
            const key = this.hotelsRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("tambohoteles")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.hotel,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    latitud: this.latitud,
                    longitud: this.longitud,
                    email: this.correo,
                    phone: this.telefono,
                    descripcion: this.descripcion,
                    direccion: this.direccion,                    
                    createdAtUnix: now.unix() 
                }
                await this.hotelsRef.child(key).set(update)
                // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
            } catch (ex) {
                return console.error(ex)
                this.failure();
            }
            this.success();
        },
        success () {
            this.$message({
            message: 'Hotel creado satisfactoriamente.',
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
    }
}
</script>

<style >
   .active{
       background-color: #f0f9eb !important;
       display: block !important;
   }
   .containerAdmin{
       margin-bottom: 10%;
   }
   
</style>
