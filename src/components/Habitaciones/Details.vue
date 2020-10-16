<template>
    <span>
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7 text-center" data-aos="fade">
            <span class="caption mb-3 sub-heading">{{this.hotel.name}}</span>
            <h1 v-if="this.room" class="mb-4 sub-heading">{{this.room.nombre}}</h1>
          </div>
        </div>
      </div>
      <div class="site-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-5 mb-md-0">
              <div class="img-border">
                <a href="#!" class="popup-vimeo image-play">                  
                  <img v-if="this.room"  :src="this.room.image" alt="" class="img-fluid">
                </a>
              </div>
            </div>
            <div class="col-md-5 ml-auto">
              <div class="section-heading text-left">
                <h2 class="mb-5">Detalles</h2>
              </div>
              <p class="mb-4">Precio: USD {{this.room.precioDol}} ó S/ {{this.room.precioPen}}</p>
              <p v-if="this.room"  class="mb-4">Descripción: {{this.room.descripcion}}</p>     
              <p v-if="this.room"  class="mb-4">Cuenta con {{this.room.camas}} cama(s)</p>
              <ul>
                <li v-for="(carac, key) in caracs" :key="key">
                    {{carac.name}}
                </li>
              </ul>         
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7 text-center" data-aos="fade">
            <span class="caption mb-3 sub-heading">Háblenos</span>
            <h1 class="mb-4 sub-heading">Póngase en contacto</h1>
          </div>
        </div>
      </div>
      <div class="site-section site-section-sm">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-8 mb-5">
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
                    <div class="col-md-12 mb-3 mb-md-0">
                        <label class="font-weight-bold" for="phone">Teléfono</label>
                        <input v-model="phone" type="text" id="phone" class="form-control" placeholder="Teléfono">
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
                </form>
            </div>
            <div class="col-lg-4">
              <div class="p-4 mb-3 bg-white">
                <h3 class="h5 text-black mb-3">Información de contacto</h3>
                <p class="mb-0 font-weight-bold">Dirección</p>
                <p v-if="this.hotel.direccion"  class="mb-4">{{this.hotel.direccion}}</p>
                <p class="mb-0 font-weight-bold">Teléfono</p>
                <p v-if="this.hotel.phone" class="mb-4">{{this.hotel.phone}}</p>
                <p class="mb-0 font-weight-bold">Correo Electrónico</p>
                <p v-if="this.hotel" class="mb-0">{{this.hotel.email}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </span>
    
</template>

<script>
import { db } from '@/firebase.js'
import axios from 'axios';

export default {
    name: "habitacion",
    data () {
      return {
        room : [],
        hotel : [],
        caracs: [],
        name: null,
        phone: null,
        email: null,
        problem: null,
        message:null,
      }
    },
    methods: {
      async getCaracs ( hab ) {
            try {
                  this.caracs = (
                    await db
                    .child("habsCaracs")  
                    .orderByChild('hab')
                    .equalTo(hab)                  
                    .once("value")                     
                ).val()
            } catch (ex) {
                return console.error(ex)
            }            
        },
        /*funciones de los hoteles */
        async getRoomData() {
           try {
                let data = (
                    await db
                    .child("rooms")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == this.$route.params.hab)
                    {    
                      this.room = data[elem];                    
                    }
                }  
            } catch (ex) {
                return console.error(ex)
            }          
        },
        async getHotelData() {
           try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == this.$route.params.hotel)
                    {    
                      this.hotel = data[elem]; 
                    }
                }                        
            } catch (ex) {
                return console.error(ex)
            }          
        },
        async SendMail () {  
            this.$message({
              message: 'Su mensaje esta siendo enviado, porfavor espere, gracias.',
              type: 'info'
            });
            if(isNaN(this.phone) && this.phone === null)
            {
                this.message = "Estimado, el número de teléfono debe contener solo números"
                this.failure()
                return
            }
            if( this.name === null)
            {
                this.message = "Porfavor necesitamos que nos diga su nombre para saber como llamarlo"
                this.failure()
                return
            }
           if( this.email === null || !validateEmail(this.email))
            {
                this.message = "Tiene que dejar su correo para poder comunicarnos con usted"
                this.failure()
                return
            }
            if( this.problem === null)
            {
                this.message = "Debe comunicarnos que desea saber"
                this.failure()
                return
            }
            const params = new URLSearchParams();
            params.append('name', this.name);
            params.append('phone', this.phone);
            params.append('email', this.email);
            params.append('problem', this.problem);
            params.append('correo', this.hotel.email );
            params.append('empresa', this.hotel.name );
            
            await axios.post('https://mails-api.herokuapp.com/api/SendMailEmpresa', params);
            
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
        }
    },
    async created () {
        await this.getRoomData(),
        await this.getHotelData(),
        await this.getCaracs ( this.$route.params.hab )
    }
}
</script>

<style scoped>
    .sub-heading{
      color: black !important;
    }
</style>