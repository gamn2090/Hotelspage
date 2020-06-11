<template>
    <span>
        <div class="site-blocks-cover overlay darker" :style="{backgroundImage: 'url(' + this.hotelData.image+')'}" >
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-7 text-center" data-aos="fade">
                        <h1 class="mb-2 brigther">{{this.hotelData.name}}</h1>
                        <h2 class="caption brigther">{{this.hotelData.descripcion}}</h2>
                    </div>
                </div>
            </div>
        </div> 
        <div class="five-reasons">
            <div class="wow fadeInUp animated" data-wow-delay="1s" data-wow-duration="1.5s" style="visibility: visible; animation-duration: 1.5s; animation-delay: 1s; animation-name: fadeInUp;">
                <h5 class="text-white">3 Razones para reservar directamente con nosotros</h5>
                <div class="five-items">
                    <ul class="text-white">
                        <li>
                        <span class="icon-calendar text-white"></span>
                        <span>Mejor Precio<br> Garantizado</span>
                        </li>
                        <li>
                        <span class="icon-check text-white"></span>
                        <span>Reservas en<br> Línea</span>
                        </li>
                        <li>
                        <span class="icon-cutlery text-white"></span>
                        <span>Ubicados en la<br> Mejor Zona de Lima, Miraflores</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>  
    </span>
</template>

<script>

export default {
    props: {
        hotelData: {
            required: true
        }
    },
    name: "Portada",
    data () {
      return {
        
      }        
    }
}
</script>

<style scoped>
    
</style>