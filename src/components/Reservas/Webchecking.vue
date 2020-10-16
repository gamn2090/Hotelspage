<template>
    <div style="text-align: center" id="app">
      <br>
      <div class="container">
          <div class="row align-items-center justify-content-center">
          <div class="col-md-7 text-center" data-aos="fade">
              <h1 class="mb-4 sub-heading">Web Check-in</h1>
              <span class="caption mb-3 sub-heading">Sin contactos, más rápido, más seguro</span>
          </div>
          </div>
      </div>
      <div class="site-section site-section-sm">
            <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 ">
                  <form action="#" class="p-5 bg-white">
                    <div class="row form-group">
                    <div class="col-md-12 mb-3 mb-md-0">
                        <label class="font-weight-bold" for="fullname">Nombre Completo</label>
                        <input v-model="name" type="text" id="fullname" class="form-control" placeholder="Nombre Completo">
                    </div>
                    </div>
                    <div class="row form-group">
                    <div class="col-md-12">
                        <label class="font-weight-bold" for="email">Correo Electrónico</label>
                        <input v-model="email" type="email" id="email" class="form-control" placeholder="Correo Electrónico">
                    </div>
                    </div>
                    <div class="row form-group">
                    <div class="col-md-12">
                        <label class="font-weight-bold" for="fullname">Hotel en el que reservó</label>
                        <el-select @change="onChange($event)" class="form-control" id="hotel" placeholder="Seleccione un hotel" v-model="hotelSelected">
                            <el-option 
                                v-for="(hotel, key) in hotelData" 
                                :key="key" 
                                :value="key" 
                                :label="hotel.name">
                                {{hotel.name}}
                            </el-option>
                        </el-select> 
                    </div>
                    </div>
                    <div class="row form-group">
                    <div class="col-md-12 mb-3 mb-md-0">
                        <label class="font-weight-bold" for="reserva">Número de Reserva</label>
                        <input v-model="reserva" type="text" id="reserva" class="form-control" placeholder="Número de reserva">
                    </div>
                    </div>
                    <div class="row form-group">
                    <div class="col-md-12">
                        <label class="font-weight-bold" for="tipoDocumento">Tipo de documento</label>
                        <el-select id="tipoDocumento" class="form-control" v-model="tipoDocumento">
                            <el-option :selected="true" disabled value="">Seleccione un tipo de documento</el-option>
                            <el-option
                              v-for="item in tipoDocs"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    </div>
                     <div class="row form-group">
                    <div class="col-md-12 mb-3 mb-md-0">
                        <label class="font-weight-bold" for="phone">Número de Documento</label>
                        <input v-model="nroDocumento" type="text" id="nroDocumento" class="form-control" placeholder="Número de documento">
                    </div>
                    </div>
                    <br>
                    <div class="row form-group">
                      <div class="col-md-12 ">
                        <VueSignaturePad id="signature" width="500px" height="200px" ref="signaturePad"
                        :options="{ backgroundColor: 'white', penColor:'red'}" />
                        
                        <div style="margin-top: 15px;">                            
                            <a style="width:90px;color:white" class="btn btn-primary pill" @click="undo">Deshacer</a>
                        </div>
                      </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <a @click="SendMail()" style="color:white" class="btn btn-primary pill px-4 py-2">Generar Web-checkin</a>
                        </div>
                    </div>                    
                  </form>
                </div>
            </div>
            </div>
          </div>
        <br>
    </div>
</template>

<script>
import axios from 'axios';
import { db } from '@/firebase.js'

export default {
  name: 'webchecking',
   data() {
      return {
        hotelSelected: null,
        hotelData: null,
        datosHotel: null,
        tipoDocumento: null,
        name: null,
        email: null,
        reserva: null,
        nroDocumento: null,
        firma: null,
        tipoDocs: [{
          value: 'Pasaporte',
          label: 'Pasaporte'
        }, {
          value: 'RUC',
          label: 'RUC'
        }, {
          value: 'DNI',
          label: 'DNI'
        }, {
          value: 'Carnet de extranjería',
          label: 'Carnet de extranjería'
        }, {
          value: 'Otros',
          label: 'Otros'
        }],        
      }
   },
   methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    // save() {
    //   const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
    //   console.log(isEmpty);
    //   console.log(data);
    // },
    async SendMail () { 

            this.$message({
                message: 'Su mensaje esta siendo enviado, porfavor espere, gracias.',
                type: 'info'
            });

            //capturo y compruebo si la firma tiene data
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            //console.log(isEmpty);
            //console.log(data);
            if(isEmpty){
                this.message = "Sin la firma no se puede generar el check in, porfavor dibuje su firma"
                this.failure()
                return
            }else{
                this.firma = data
            }
            
            //console.log(this.firma)
            if(this.hotelSelected === null)
            {
                this.message = "Es necesario que señale en que hotel realizó la reserva"
                this.failure()
                return
            }
            if(this.tipoDocumento === null)
            {
                this.message = "Estimado, debe elegir el tipo de documento con el que realizó la reserva"
                this.failure()
                return
            }
            if(this.name === null)
            {
                this.message = "Es necesario que introduzca su nombre completo"
                this.failure()
                return
            }
            if(this.reserva === null)
            {
                this.message = "Es imperativo que introduzca su número de reserva"
                this.failure()
                return
            }
            if( this.nroDocumento === null)
            {
                this.message = "Porfavor necesitamos que ingrese su número de documento de identidad"
                this.failure()
                return
            }
            if( this.email === null || !this.validateEmail(this.email))
            {
                this.message = "Tiene que dejar un correo válido para poder comunicarnos con usted"
                this.failure()
                return
            }         
           //alert(this.name+' '+this.fechas+' '+this.habSelected+' '+this.ninios+' '+this.adultos+' '+this.email+' '+this.problem+' '+this.cantHabs)
            const params = new URLSearchParams();
            params.append('nombre', this.name);
            params.append('firma', this.firma);
            params.append('tipoDocumento', this.tipoDocumento);
            params.append('hotel', this.datosHotel.name);
            params.append('reserva', this.reserva);
            params.append('nroDocumento', this.nroDocumento);
            params.append('correoElectronico', this.email);
            //params.append('correo', this.datosHotel.email );
            params.append('correo', 'gamn2090@gmail.com' );
            params.append('empresa', this.datosHotel.name );
            try{
                await axios.post('https://mails-api.herokuapp.com/api/Web-checkin', params);
            }catch(ex){
                this.message = "No podemos enviar el mensaje"
                this.$message.error(this.message);
            }
            this.success();    
        },
        failure() {            
            this.$message.error(this.message);
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        },
        success() {
            this.$message({
            message: 'Su mensaje ha sido enviado, nos pondremos en contacto con usted lo más pronto posible, gracias.',
            type: 'success'
            });
            this.name= null;
            this.phone= null;
            this.email= null;
            this.problem= null;
        },
        async getHotelData() {
           try {
                this.hotelData = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()
                
                this.hotel = this.$route.params.key;                 
                console.log                          
            } catch (ex) {
                return console.error(ex)
            }          
        },
        async loadHotel ( hotel ) {            
            try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == hotel)
                    {    
                      this.datosHotel = data[elem]; 
                    }
                }   
            console.log(this.datosHotel)                     
            } catch (ex) {
                return console.error(ex)
            }          
        },       
        onChange ( event ) {
          console.log(this.hotelSelected)
            this.loadHotel(this.hotelSelected) 
        },      
    },
    async created () {
        await this.getHotelData()
    },
};
</script>

<style scoped>
    .sub-heading{
      color: black !important;
    }

    #signature {
        margin: auto;
        border: solid 3px black;
        border-radius: 5px;        
        background-origin: border-box;
        background-clip: content-box, border-box;
    }
    
</style>