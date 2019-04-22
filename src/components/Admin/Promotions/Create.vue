<template>
    <div class="content">
        <center><h3>Crear Promociones</h3></center> 
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la Promoción</label>
                            <el-input type="text" v-model="promo" placeholder="Promocion"></el-input>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la promocion</label><br>
                            <input class="" type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Fecha de Inicio</label><br>
                            <el-date-picker
                            v-model="fechaInicio"
                            type="date"
                            value-format="dd-MM-yyyy"
                            placeholder="Elija un día">
                            </el-date-picker>                            
                        </div>
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >fecha Final</label><br>
                            <el-date-picker
                            v-model="fechaFin"
                            type="date"
                            value-format="dd-MM-yyyy"
                            placeholder="Elija un día">
                            </el-date-picker>
                        </div>                        
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <el-select id="hotel" v-model="hotelSelected">
                                <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                                <el-option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</el-option>
                            </el-select> 
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descuento</label><br>
                            <el-input-number v-model="descuento" placeholder="10"></el-input-number>
                        </div>                        
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Precio en Dolares</label><br>
                            <el-input-number v-model="precioDol"  placeholder="75"></el-input-number>
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <el-input
                            type="textarea"
                            :rows="2" v-model="descripcion" name="message" placeholder="Describa su promoción"></el-input>
                        </div>                                             
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">¿Desea que esta promoción aparezca en el inicio?</label>
                            <el-select v-model="mainPromo" >
                                <el-option   
                                label="Si"                             
                                value="True">Si
                                </el-option>
                                <el-option   
                                label="No"                             
                                value="False">
                                No</el-option>
                            </el-select>   
                        </div>
                        <div class="col-md-6">
                            <input style="margin-top: 10%;" @click="addPromo" value="crear" class="btn btn-primary pill px-4 py-2">
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
        files: [],
        promo: null,
        precioDol: null,
        descuento: null,
        descripcion: null,
        fechaInicio: null,
        mainPromo:null,
        fechaFin: null,
        hotelSelected : null,
        promos: [],
        tempArray: [],
        hotels: [],
        promosRef: db.child("promos"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {
        getFiles() {
            this.files = this.$refs.files.files
        },    
        async addPromo() {
            const key = this.promosRef.push().key
            try {
                const file = this.$refs.files.files[0]
                const url = await (
                    await storage.ref("promos")
                        .child(key)
                        .put(file)
                ).ref.getDownloadURL()
                const now = moment()
                const update = {
                    name: this.promo,
                    precioDol: this.precioDol,
                    fechaInicio: this.fechaInicio,
                    fechaFin: this.fechaFin,
                    descuento: this.descuento,
                    hotel: this.hotelSelected,
                    description: this.descripcion,
                    mainPromo: this.mainPromo,
                    image: url,
                    createdAt: now.format("DD/MM/YYYY"),
                    createdAtUnix: now.unix() 
                }
                await this.promosRef.child(key).set(update)                               

            } catch (ex) {
                return console.error(ex)
                this.failure();
            }
            console.log(this.fechaInicio+'-'+this.fechaFin)
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
            message: 'Promoción creada satisfactoriamente.',
            type: 'success'
            });
        },
        failure () {
            this.$message.error('Ha Ocurrido un error, intente de nuevo más tarde');
        },
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style lang="">
    
</style>
