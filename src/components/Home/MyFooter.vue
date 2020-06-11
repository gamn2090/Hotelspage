<template>
    <footer class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="footer-heading mb-4 text-white">Nosotros</h3>
                    <p>Contamos con 3 hoteles que ofrecen una excelente ubicación y le permitirán visitar cómodamente a pie los lugares mas atractivos de Miraflores.</p>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="footer-heading mb-4 text-white">Menu Rápido</h3>
                            <ul class="list-unstyled">                                
                                <li><a href="/Hoteles/-Ld4kdUfsXiocoWudFnt">El Tambo Uno</a></li>
                                <li><a href="/Hoteles/-Ld4kk5Ev7o_UCdDayty">El Tambo Dos </a></li>
                                <li><a href="Hoteles/-LsgpNGN1Ml4b4UL-Dti">El Tambo dos de Mayo</a></li>
                            </ul>
                        </div>                        
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="col-md-12"><h3 class="footer-heading mb-4 text-white">Encuentranos también en:</h3></div>
                    <div class="col-md-12">
                        <p>
                            <a target="_blank" href="https://www.facebook.com/Hoteles-El-Tambo-105795394231178" class="pb-2 pr-2 pl-0"><span class="icon-facebook"></span></a>
                            <a target="_blank" href="https://www.tripadvisor.com.pe/Hotel_Review-g14097971-d20469134-Reviews-Hotel_El_Tambo_1-Miraflores_Arequipa_Region.html?m=19905" class="p-2"><span class="icon-tripadvisor"></span></a>
                            <a target="_blank" href="https://www.instagram.com/eltamboperu/" class="p-2"><span class="icon-instagram"></span></a>
                            <!--<a href="#!" class="p-2"><span class="icon-vimeo"></span></a>-->
                        </p>
                    </div>
                     <div class="col-md-12">
                        <router-link :to="'/'" >
                            <img src='@/assets/logo3.png' alt="El Tambo">                                
                        </router-link></h2>
                     </div>
                </div>
            </div>
            <div class="row pt-5 mt-5 text-center">
                <div class="col-md-12">
                    <p>
                        Copyright &copy; 2020 Hotel el Tambo Todos los derechos reservados | Powered by <strong><a href="https://www.chevere.tech" target="_blank">ChevereTech</a></strong>
                        &copy;
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "MyFooter",
    data () {
      return {
        
      }
    }
}
</script>