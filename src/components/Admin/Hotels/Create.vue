<template>
    <div class="content">
        <center><h3>Crear Hotel</h3></center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">
                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre del hotel</label>
                            <input type="text" class="form-control" v-model="hotel" placeholder="nombre hotel">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen del hotel</label><br>
                            <input type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Latitud</label>
                            <input type="text" v-model="latitud" class="form-control" placeholder="-72.225486">
                        </div>
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Longitud</label>
                            <input type="text" v-model="longitud" class="form-control" placeholder="-72.225486">
                        </div>                        
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <textarea v-model="descripcion" name="message" cols="30" rows="2" class="form-control" placeholder="Describa su hotel"></textarea>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Dirección</label>
                            <textarea v-model="direccion" name="message" cols="30" rows="2" class="form-control" placeholder="Dirección exacta de su hotel"></textarea>
                        </div>
                    </div>
                    <div class="row form-group">
                    <div class="col-md-12">
                        <input  @click="addHotel" value="crear" class="btn btn-primary pill px-4 py-2">
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
        latitud: null,
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
        },        
        // Un sugerencia que te doy es que cuando uses las funciones de firebase que devuelven promesas, uses async/await, es cosa de gente praah
        // Las que devuelven promesas son: set, update, once...
        // Te encontrarás el caso donde necesitarás primero tener el key para poder guardar luego...
        // Cuando necesites actualizar varios nodos al tiempo, siempre pasa...
        async addHotel() {
            // puedes hacer esto...
            const key = this.hotelsRef.push().key
            try {
                // DINDOOOOOOOO Ahora si a ver...
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
                    descripcion: this.descripcion,
                    direccion: this.direccion,
                    createdAtUnix: now.unix() 
                }
                await this.hotelsRef.child(key).set(update)
                // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
            } catch (ex) {
                return console.error(ex)
            }
            alert("Agregado con éxito.")
        },
    }
}
</script>

<style scoped>
   
</style>
