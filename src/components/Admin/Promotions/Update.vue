<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Actualizar Promoción</h3>
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
                            <label class="font-weight-bold">Promoción a editar</label><br>
                            <el-select @change="loadPromo($event)" v-model="promoSelected" placeholder="Debe Seleccionar un hotel">
                                <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                                <el-option
                                v-for="(item, key) in promos"
                                :key="key"
                                :label="item.name"
                                :value="key">
                                </el-option>
                            </el-select>
                        </div>                                                      
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la Promoción</label>
                            <el-input type="text" v-model="promo" placeholder="Promocion"></el-input>
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la promocion</label><br>
                            <input type="file" @change="getFiles()" ref="files">
                            <img height="150" :src="this.hotelImage">
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
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Precio en Dolares</label><br>
                            <el-input-number v-model="precioDol" :min="0" :max="1000"></el-input-number>
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label><br>
                            <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="Describa su promoción"
                            v-model="descripcion">
                            </el-input>                            
                        </div>                                             
                    </div>
                    <div class="row form-group">                       
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descuento</label><br>
                            <el-input-number v-model="descuento" :min="0" :max="1000"></el-input-number>
                        </div> 
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
                    </div>                    
                    <div class="row form-group">                        
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="editPromo" value="Actualizar" class="btn btn-primary pill px-4 py-2">
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
        messaje: 'En este módulo le será posible actualizar los datos de una promoción ya creada, para comenzar primero necesita seleccionar el hotel al que pertenece y seguidamente la promición a editar, luego de esto se cargarán los datos ya almacenados en la base de datos y usted podrá cambiar los necesarios, posteriormente presiona el boton "Actualizar" y la información será actualizada.',
        title: 'Actualizar Promoción',
        /*fin variables para info */
        files: [],
        hotel: null,
        promoSelected: null,
        hotelSelected: null,
        hotelImage: null,
        /* */
        promo: null,        
        precioDol: null,
        descuento: null,
        descripcion: null,
        fechaInicio: null,
        mainPromo:null,
        fechaFin: null,
        /* */
        hotels: [],        
        promos: [],        
        promosRef: db.child("promos"),
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
        async editPromo() {            
            try {
                const key = this.promoSelected;
                const file = this.$refs.files.files[0]
                let url = null
                if(file)
                {
                    url = await (
                        await storage.ref("promos")
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
                this.hotels = []
                this.promos = []
                this.promo = null,
                this.precioDol = 0,
                this.fechaInicio = null,
                this.fechaFin = null,
                this.descuento = 0,
                this.hotel = null,
                this.descripcion = null,
                this.mainPromo = null,
                this.image = null,
                await this.getHotels()
                // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
            } catch (ex) {
                return console.error(ex)
            }
            this.success();           
        
        }, 
        async getPromos( hotel ) {
           try {
                this.promos = (
                    await db
                    .child("promos")
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
        async selectedPromo ( promo ) {            
            try {
                let data = (
                    await db
                    .child("promos")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == promo)
                    {    
                      this.promoEditar = data[elem]; 
                    }
                } 
                this.oldImage =      this.promoEditar.image
                this.hotelImage =    this.promoEditar.image
                this.promo =         this.promoEditar.name
                this.precioDol =     this.promoEditar.precioDol
                this.descuento =     this.promoEditar.descuento
                this.descripcion =   this.promoEditar.description
                this.fechaInicio =   this.promoEditar.fechaInicio
                this.mainPromo =     this.promoEditar.mainPromo
                this.fechaFin =      this.promoEditar.fechaFin

            } catch (ex) {
                return console.error(ex)
            }            
                //console.log(this.hotels)                      
        },       
        onChange ( event ) {
            this.getPromos ( this.hotelSelected )  
        },  
        loadPromo ( event ) {
            this.selectedPromo ( this.promoSelected )  
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
