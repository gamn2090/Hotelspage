<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Editar Hotel</h3>
            <i @click="showInfo()" class="el-icon-question help-icon"></i>        </center>
        <br><br>
        <div class="containerAdmin">
            <el-row :gutter="20">
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Hotel a editar</label><br>
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
                </el-col>
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold" >Nombre del hotel</label>
                    <el-input type="text" v-model="hotel" placeholder="hotel uno"></el-input>
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
            <el-row :gutter="20">                
                <el-col :xs="24" :md="10" :offset="1">
                    <label class="font-weight-bold">Imagen del hotel</label><br>
                    <input type="file" @change="getFiles()" ref="files">
                    <img height="150" :src="this.hotelImage">
                </el-col>        
                <el-col :xs="24" :md="10" :offset="1">
                    <br>
                    <input @click="editHotel" value="Editar" class="btn btn-primary pill px-4 py-2">
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
        messaje: 'Este módulo le permite actualizar los datos de un hotel creado. primero deberá seleccionar a que hotel le hará los cambios, al hacer esto, se cargarán los datos almacenados actualmente, realiza los cambios necesarios y luego presiona el boton "Actualizar", esto almacenará los datos nuevos y al recargar la página (principal) se verán los cambios. Como dato adicional, cabe destacar que para eliminar un hotel se debe comunicar con soporte técnico, puesto que es un proceso delicado.',
        title: 'Actualizar Hotel',
        /*fin variables para info */
        files: [],
        hotel: null,
        oldImage: null,
        hotelImage: null,
        correo: null,
        telefono: null,
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
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.hotelImage = fileReader.result
            })
            fileReader.readAsDataURL(this.files[0])
        },                
        async editHotel() {
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
                        email: this.correo,
                        phone: this.telefono,
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
                this.hotelImage = this.hotelEditar.image,
                this.hotel = this.hotelEditar.name,
                this.latitud= this.hotelEditar.latitud,
                this.longitud= this.hotelEditar.longitud,
                this.descripcion= this.hotelEditar.descripcion,
                this.direccion= this.hotelEditar.direccion,
                this.telefono= this.hotelEditar.phone,
                this.correo= this.hotelEditar.email,

                console.log(this.oldImage)
            } catch (ex) {
                return console.error(ex)
            }            
        },       
        onChange ( event ) {
            this.selectedHotel ( this.hotelSelected )  
        },
        success () {
            this.$message({
            message: 'Hotel actualizado satisfactoriamente.',
            type: 'success'
            });
            this.selectedHotel ( this.hotelSelected )
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

<style >
   .containerAdmin{
       margin-bottom: 10%;
   }
</style>
