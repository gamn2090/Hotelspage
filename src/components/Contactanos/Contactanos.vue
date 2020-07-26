<template>
    <div>
        <div class="container">
            <div class="row align-items-center justify-content-center">
            <div class="col-md-7 text-center" data-aos="fade">
                <span class="caption mb-3 sub-heading">Hablenos</span>
                <h1 class="mb-4 sub-heading">Póngase en Contacto</h1>
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
                    <p v-if="hotelData" class="mb-4">{{hotelData.direccion}} </p>
                    <p class="mb-0 font-weight-bold">Teléfono</p>
                    <p v-if="hotelData" class="mb-4">{{hotelData.phone}}</p>
                    <p class="mb-0 font-weight-bold">Correo Electrónico</p>
                    <p v-if="hotelData" class="mb-0">{{hotelData.email}}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Contactanos",
    data () {
      return {
        name: null,
        phone: null,
        email: null,
        problem: null,
        message:null,
      }        
    },
    props: {
        hotelData: {
            required: true
        }        
    },
    methods: {        
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
            params.append('correo', this.hotelData.email );
            //params.append('correo', 'gamn2090@gmail.com' );
            params.append('empresa', this.hotelData.name );
            
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
    }
}
</script>

<style scoped>
    .sub-heading{
      color: black !important;
    }
</style>