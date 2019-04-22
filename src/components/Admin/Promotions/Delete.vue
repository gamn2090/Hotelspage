<template>
    <div class="content">
        <center><h3>Eliminar Promociones</h3></center> 
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
                            <label class="font-weight-bold">Promoción a eliminar</label><br>
                            <el-select id="hotel" v-model="promo">
                                <el-option v-for="(promo, key) in promos" :key="key" :value="key" :label="promo.name">{{promo.name}}</el-option>
                            </el-select> 
                        </div>                                          
                    </div>
                    
                    <div class="row form-group">
                       
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="deletePromo(promo)" value="Eliminar" class="btn btn-primary pill px-4 py-2">
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
        promo: null,
        hotelSelected : null,
        hotels: [],
        promos: [],
        promosRef: db.child("promos"),
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
        async getPromos ( hotel ) {
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
        onChange ( event ) {
            this.getPromos ( this.hotelSelected )  
        }, 
        deletePromo:function(key){

            this.$confirm('Esto eliminará la promoción de manera permanente, ¿desea continuar?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
                }).then(() => {
                    this.promosRef.child(key).remove()
                    this.promos = []
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
            message: 'Promoción eliminada satisfactoriamente.',
            type: 'success'
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
