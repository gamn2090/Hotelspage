<template >
    <div id="checkin">
        <div class="container">
            <div class="row align-items-center justify-content-center">
            <div class="col-md-7 text-center" data-aos="fade">
                <span class="caption mb-3 sub-heading">¡Reserve ahora!</span>
                <h1 class="mb-4 sub-heading">Póngase en Contacto</h1>
            </div>
            </div>
        </div>
        <div class="site-section site-section-sm">
            <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-12 mb-5">
                <form action="#" class="p-5 bg-white">
                    <fieldset>
                        <div class="row form-group">
                            <div class="col-md-12 mb-3 mb-md-0">
                                <label class="font-weight-bold" for="fullname">Nombre Completo</label>
                                <input v-model="name" type="text" id="fullname" class="form-control" placeholder="Nombre Completo">
                            </div>
                            <div class="col-md-12">
                                <label class="font-weight-bold" for="email">Correo Electrónico</label>
                                <input v-model="email" type="email" id="email" class="form-control" placeholder="Correo Electrónico">
                            </div>
                            <div class="col-md-12">
                                <label class="font-weight-bold">Fecha Llegada</label><br>
                                <el-date-picker 
                                    format="dd-MM-yyyy"
                                    value-format="dd-MM-yyyy"
                                    v-model="fechasini"
                                    type="date">
                                </el-date-picker>
                            </div>
                            <div class="col-md-12">
                                <label class="font-weight-bold">Fecha Salida</label><br>
                                <el-date-picker 
                                    format="dd-MM-yyyy"
                                    value-format="dd-MM-yyyy"
                                    v-model="fechasfin"
                                    type="date">
                                </el-date-picker>
                            </div>
                            <div class="col-md-12 mb-3 mb-md-0">
                                <label class="font-weight-bold" for="fullname">Hotel en el que reservará</label>
                                <el-select class="form-control" @change="onChange($event)" id="hotel" placeholder="Seleccione un hotel" v-model="hotelSelected">
                                    <el-option 
                                        v-for="(hotel, key) in hotelData" 
                                        :key="key" 
                                        :value="key" 
                                        :label="hotel.name">
                                        {{hotel.name}}
                                    </el-option>
                                </el-select> 
                            </div>
                            <div class="col-md-12 mb-3 mb-md-0">
                                <label class="font-weight-bold" for="fullname">Tipo de habitacion</label>
                                <el-select class="form-control" v-model="habSelected">
                                    <el-option :selected="true" disabled value="">Seleccione un habitación</el-option>
                                    <el-option
                                    v-for="(item, key) in habitaciones"
                                    :key="key"
                                    :label="item.nombre"
                                    :value="item.nombre">
                                    {{item.nombre}}
                                    </el-option>
                                </el-select>
                            </div>
                        </div>                   
                        <div class="row form-group">
                        <div class="col-md-12 mb-3 mb-md-0">
                            <label class="font-weight-bold" for="phone">Cantidad de habitaciones</label>
                            <input v-model="cantHabs" type="text" id="cantHabs" class="form-control" placeholder="Cantidad de Habitaciones">
                        </div>
                        <div class="col-md-12 mb-3 mb-md-0">
                            <label class="font-weight-bold" for="phone">Cantidad de adultos</label>
                            <input v-model="adultos" type="text" id="adultos" class="form-control" placeholder="Cantidad de adultos">
                        </div>
                        <div class="col-md-12 mb-3 mb-md-0">
                            <label class="font-weight-bold" for="phone">Cantidad de niños</label>
                            <input v-model="ninios" type="text" id="ninios" class="form-control" placeholder="Cantidad de niños">
                        </div>
                        </div>
                        <div class="row form-group">
                        <div class="col-md-12">
                            <label class="font-weight-bold" for="message">Mensaje</label>
                            <textarea v-model="problem" name="message" id="message" cols="30" rows="5" class="form-control" placeholder="Diganos que necesita"></textarea>
                        </div>
                        </div>
                        <div class="row form-group">
                        <div class="col-md-12">
                            <input @click="SendMail()" value="Enviar Mensaje" class="btn btn-primary pill px-4 py-2">
                        </div>
                        </div>
                    </fieldset>
                </form>
                </div>                
            </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { db } from '@/firebase.js'

export default {
    name: "Contactanos",
    data () {
      return {
        habitaciones: null,
        name: null,
        datosHotel: null,
        cantHabs: null,
        email: null,
        problem: null,
        adultos: null,
        ninios: null,
        message:null,
        habSelected:null,
        hotelSelected:null,
        fechasini:null,
        fechasfin:null
      }        
    },
    props: {
        hotelData: {
            required: true
        }    
    },
    methods: {  
        showTime(){
            alert(this.fechas)
        },   
        async SendMail () {  
            this.$message({
                message: 'Su mensaje esta siendo enviado, porfavor espere, gracias.',
                type: 'info'
            });
            
            if(this.hotelSelected === null)
            {
                this.message = "Estimado, debe elegir en cual de nuestros hoteles se hospedará"
                this.failure()
                return
            }
            if(this.fechasini === null)
            {
                this.message = "Estimado, necesitamos que especifique la fecha en la cual llegará a nuestro hotel"
                this.failure()
                return
            }
            if(this.fechasfin === null)
            {
                this.message = "Estimado, necesitamos que especifique la fecha en la cual dejará nuestro hotel"
                this.failure()
                return
            }
            if( this.name === null)
            {
                this.message = "Porfavor necesitamos que nos diga su nombre"
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
            params.append('fechasini', this.fechasini);
            params.append('fechasfin', this.fechasfin);
            params.append('hotel', this.hotelSelected);
            params.append('tipoHabitacion', this.habSelected);
            params.append('cantidadNiniosos', this.ninios);
            params.append('correoElectronico', this.email);
            params.append('cantidadAdultos', this.adultos);
            params.append('comentario', this.problem);
            params.append('cantidadHabitacion', this.cantHabs);
            params.append('correo', this.datosHotel.email );
            //params.append('correo', 'gamn2090@gmail.com' );
            params.append('empresa', this.datosHotel.name );
            try{

                await axios.post('https://mails-api.herokuapp.com/api/Reservar', params);
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
         async getHabs( hotel ) {
           try {
                this.habitaciones = (
                    await db
                    .child("rooms")
                    .orderByChild('hotel')
                    .equalTo(hotel)
                    .once("value")
                ).val()                                          
                    
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
            this.getHabs ( this.hotelSelected )
            this.loadHotel(this.hotelSelected) 
        },
       
    }
}
</script>

<style scoped>
    .sub-heading{
      color: black !important;
    }
    
</style>