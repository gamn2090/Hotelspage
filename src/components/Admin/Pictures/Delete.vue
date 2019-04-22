<template>
    <div class="content">
        <center><h3>Eliminar Imagenes</h3></center> 
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-12">
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
                                                             
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label class="font-weight-bold">Imagen a eliminar</label><br>
                            <div class="row no-gutters">  
                                <div v-for="(foto, key) in fotos" :key="key" @click="deleteFoto(key)" class="col-md-6 col-lg-3">
                                    <img style="cursor:pointer;width:232.5; height:154.89 !important" :src="foto.image || '../../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid" :title=foto.name>
                                </div>                       
                            </div> 
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
    name: "Imagenes",
    data () {
      return {
        foto: null,
        hotelSelected : null,
        hotels: [],
        fotos: [],
        fotosRef: db.child("fotos"),
        hotelsRef: db.child("tambohotels")
        }
    },
    methods: {  
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
        async getFotos ( hotel ) {
            try {
                  this.fotos = (
                    await db
                    .child("fotos")  
                    .orderByChild('hotel')
                    .equalTo(hotel)                  
                    .once("value")                     
                ).val()
            } catch (ex) {
                return console.error(ex)
            }            
        },
        onChange ( event ) {
            this.getFotos ( this.hotelSelected )  
        },
        deleteFoto:function(key){
            this.$confirm('Esto eliminará la imagen de manera permanente, ¿desea continuar?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
                }).then(() => {
                    this.fotosRef.child(key).remove()
                    this.fotos = []
                    this.success();
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Eliminación cancelada por el usuario'
                });          
            });           
        },
        success () {
            this.$message({
            message: 'Imagen eliminada satisfactoriamente.',
            type: 'success'
            });
        },
        failure () {
            this.$message.error('Ha Ocurrido un error, intente de nuevo más tarde');
        }
        
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style lang="">
    
</style>
