<template>
    <div class="content">
        <center><h3>Editar Hotel</h3></center>
        <br><br>
        <center>
            <div class="container">
            <div class="row">                
                <div class="col-md-12">
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label class="font-weight-bold">Hotel al que pertencece</label><br>
                            <select @change="onChange($event)" class="form-control" id="hotel" v-model="hotelSelected">
                                <option v-for="(hotel, key) in hotels" :key="key" :value="key" :label="hotel.name">{{hotel.name}}</option>
                            </select> 
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Promoción a editar</label><br>
                            <select @change="loadPromo($event)" class="form-control" id="hotel" v-model="promoSelected">
                                <option v-for="(promo, key) in promos" :key="key" :value="key" :label="promo.name">{{promo.name}}</option>
                            </select> 
                        </div>                                                      
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold">Nombre de la Promoción</label>
                            <input type="text" class="form-control" v-model="promo" placeholder="Promocion">
                        </div>
                        <div class="col-md-6">
                            <label class="font-weight-bold">Imagen de la promocion</label><br>
                            <input class="btn btn-primary pill px-4 py-2" type="file" @change="getFiles()" ref="files">
                        </div>
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Fecha de Inicio</label>
                            <input type="text" v-model="fechaInicio" class="form-control" placeholder="01/04/2019">
                        </div>
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >fecha Final</label>
                            <input type="text" v-model="fechaFin" class="form-control" placeholder="01/05/2019">
                        </div>                        
                    </div>                    
                    <div class="row form-group">
                        <div class="col-md-6 mb-3 mb-md-0">
                            <label class="font-weight-bold" >Precio en Dolares</label>
                            <input type="number" v-model="precioDol" class="form-control" placeholder="75">
                        </div> 
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descripción</label>
                            <textarea v-model="descripcion" name="message" cols="30" rows="2" class="form-control" placeholder="Describa su promoción"></textarea>
                        </div>                                             
                    </div>
                    <div class="row form-group">                       
                        <div class="col-md-6">
                            <label class="font-weight-bold">Descuento</label>
                            <input type="number" v-model="descuento" class="form-control" placeholder="10">
                        </div> 
                        <div class="col-md-6">
                        <label class="font-weight-bold">¿Desea que esta promoción aparezca en el inicio?</label>
                        <select class="form-control" id="principal" v-model="mainPromo">
                            <option :selected="true" value=true>Si</option>
                            <option value=false>No</option>                                
                        </select> 
                    </div>                       
                    </div>                    
                    <div class="row form-group">                        
                        <div class="col-md-12">
                            <input style="margin-top: 10%;" @click="editPromo" value="crear" class="btn btn-primary pill px-4 py-2">
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
        files: [],
        hotel: null,
        promoSelected: null,
        hotelSelected: null,
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
        },                
        async editPromo() {
            if(confirm('¿Está seguro que desea eliminar esta promoción'))
            {
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
                    this.precioDol = null,
                    this.fechaInicio = null,
                    this.fechaFin = null,
                    this.descuento = null,
                    this.hotel = null,
                    this.description = null,
                    this.mainPromo = null,
                    this.image = null,
                    await this.getHotels()
                    // Y así puedes handlear el error como te de la puta gana we hee hee ayuwoki
                } catch (ex) {
                    return console.error(ex)
                }
                alert("Hotel editado con éxito.")
            }
            else 
            {
                alert("Edición cancelada por el usuario")
            }
            
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
                this.oldImage =      this.promoEditar.image,
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
            this.getPromos ( event.target.value )  
        },  
        loadPromo ( event ) {
            this.selectedPromo ( event.target.value )  
        },          
    }, 
    async created () {
        await this.getHotels()
    }
}
</script>

<style scoped>
   
</style>
