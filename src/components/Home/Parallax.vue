<template>
    <span>
        <div class="py-5 upcoming-events" :style="{backgroundImage: 'url(' + require('@/assets/img_8.jpg')+')',
                                                backgroundAttachment:'fixed',
                                                height:'60vh', 
                                                backgroundSize: 'cover' }">
            <div style="height:100%" class="container">
                <div style="text-align:center;position:relative;height:100% " class="row align-items-center ">
                    <div class="col-md-12 vertically-centered">
                        <h4 style="display:inline-block" class="text-white stroke">¡Sé el primero en enterarte de nuestras promociones, deja tus datos de contacto!</h4>
                        <div class="row">
                            <input type="text" class="form-control col-md-5" v-model="name" placeholder="Su nombre">
                            <input type="text" class="form-control col-md-5" v-model="correo" placeholder="Su correo electrónico">
                            <button @click="SendMail()" value="Enviar Mensaje" class="btn btn-primary pill green col-md-2">Registarse</button>
                        </div>
                        <!-- <h2 style="display:inline-block" class="text-white stroke">¡Disfrute de lo mejor de Lima en nuestros hoteles!</h2> -->
                    </div> 
                                
                </div>
            </div> 
                      
        </div>        
    </span>
</template>

<script>
import axios from 'axios';

export default {
    name: "Parallax",
    data () {
      return {
        name: null,
        correo: null,
      }
    },
    methods: {        
        async SendMail () {  
            this.$message({
                message: 'Su mensaje esta siendo enviado, porfavor espere, gracias.',
                type: 'info'
            });
            if(isNaN(this.name) && this.name === null)
            {
                this.message = "Estimado, necesitamos que nos diga su nombre para saber como llamarlo"
                this.failure()
                return
            }            
            if( this.correo === null || !this.validateEmail(this.correo))
            {
                this.message = "Tiene que dejar su correo para poder comunicarnos con usted"
                this.failure()
                return
            }            
            const params = new URLSearchParams();
            params.append('name', this.name);
            params.append('correo', this.correo);
            params.append('correoEmpresa', 'ventas@eltamboperu.com' );
            //params.append('correoEmpresa', 'gamn2090@gmail.com' );
            
            await axios.post('https://mails-api.herokuapp.com/api/Newsletter', params);
            //await axios.post('http://localhost/mailApi/public/api/Newsletter', params);
            
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
            message: '¡Se ha registrado exitosamente a nuestra newsletter!.',
            type: 'success'
            });
            this.name= null;
            this.correo= null;
        }
    }
}
</script>

<style scoped>
    .green{
        background-color: rgb(11,119,61);
        border: 1px solid rgb(11,119,61);
    }
    .vertically-centered{
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .stroke{
        background-color:rgba(81, 81, 81, .5);
        padding:20px;
    }
</style>