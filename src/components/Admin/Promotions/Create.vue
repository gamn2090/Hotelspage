<template>
    <div class="content">
        <center>
            <h3 style="display:inline-block">Crear Promoción</h3>
            <i @click="showInfo()" class="el-icon-question help-icon"></i>
        </center> 
        <br><br>
            <div class="containerAdmin">
                <el-row :gutter="20">
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold">Nombre de la Promoción</label>
                        <el-input type="text" v-model="promo" placeholder="Promocion"></el-input>
                    </el-col>
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold">Imagen de la promocion</label><br>
                        <input class="" type="file" @change="getFiles()" ref="files">
                        <img height="150" :src="this.hotelImage">
                    </el-col>                
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold" >Fecha de Inicio</label><br>
                        <el-date-picker
                            v-model="fechaInicio"
                            type="date"
                            value-format="dd-MM-yyyy"
                            placeholder="Elija un día">
                        </el-date-picker>
                    </el-col>
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold" >fecha Final</label><br>
                        <el-date-picker
                            v-model="fechaFin"
                            type="date"
                            value-format="dd-MM-yyyy"
                            placeholder="Elija un día">
                        </el-date-picker>
                    </el-col>                
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold">Hotel al que pertencece</label><br>
                        <el-select id="hotel" v-model="hotelSelected">
                            <el-option :selected="true" disabled value="">Seleccione un Hotel</el-option>
                            <el-option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</el-option>
                        </el-select> 
                    </el-col>
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold">Descuento</label><br>
                        <el-input-number v-model="descuento" placeholder="10"></el-input-number>
                    </el-col>                
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold" >Precio en Dolares</label><br>
                        <el-input-number v-model="precioDol"  placeholder="75"></el-input-number>
                    </el-col>
                    <el-col :xs="24" :md="10" :offset="1">
                        <label class="font-weight-bold">Descripción</label>
                        <el-input
                        type="textarea"
                        :rows="2" v-model="descripcion" name="message" placeholder="Describa su promoción"></el-input>
                    </el-col>                
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :md="10" :offset="1">
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
                    </el-col>
                    <el-col :xs="24" :md="10" :offset="1">
                        <input v-if="this.imageInvalid == false" style="margin-top: 10%;" @click="addPromo" value="Crear" class="btn btn-primary pill px-4 py-2">
                    </el-col>                
                </el-row>  
            </div>
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
        messaje: 'Para poder crear una promoción primero necesita especificar el nombre de la misma, luego seleccionar una imagen que la defina, posteriormente se seleccionan las fechas de inicio y final de la misma (se pueden dejar vacías si es una promoción que no tiene final), luego de esto se selecciona el hotel al que pertenece la promoción a ser creada, luego de esto se coloca el descuento que tendrá (si es que tiene uno, si no tiene se debe ignorar este campo y dejarlo en "0"), asimismo se debe colocar el preció en dolares, una descripción y decidir si quiere que esta promoción aparezca en la pantalla principal de su página y a continuación se presiona "Crear" para almacenarla.',
        title: 'Crear Promoción',
        /*fin variables para info */
        files: [],
        promo: null,
        precioDol: null,
        descuento: null,
        hotelImage:null,
        descripcion: null,
        fechaInicio: null,
        mainPromo:null,
        fechaFin: null,
        hotelSelected : null,
        promos: [],
        tempArray: [],
        imageInvalid : true,
        hotels: [],
        promosRef: db.child("promos"),
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
    .containerAdmin{
       margin-bottom: 10%;
   }
</style>
