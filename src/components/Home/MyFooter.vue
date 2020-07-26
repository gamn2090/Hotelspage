<template>
    <footer class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="footer-heading mb-4 text-white">Nosotros</h3>
                    <p>Contamos con 3 hoteles que ofrecen una excelente ubicación y le permitirán visitar cómodamente a pie los lugares mas atractivos de Miraflores.</p>   
                    <h3 class="footer-heading mb-4 text-white">Protocolos de Bio-seguridad</h3>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="https://drive.google.com/file/d/1yXjfqngpG9AafMLADCUEhPYZYSICjqBh/view?usp=sharing" download target="_blank">
                                        El Tambo
                                    </a> 
                                </li>
                                <li>
                                    <a href="https://drive.google.com/file/d/1rkXYyhh8C92cRLk1HZ3st1vNdxjA0tuu/view?usp=sharing" download target="_blank">
                                        El Tambo Dos
                                    </a> 
                                </li>
                                <li>
                                    <a href="https://drive.google.com/file/d/19_3jdSNnMfl5rowF0oJRvCDVsTj0n5A4/view?usp=sharing" download target="_blank">
                                        El Tambo Dos de Mayo
                                    </a>  
                                </li>                                
                            </ul>                 
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="footer-heading mb-4 text-white">Menu Rápido</h3>
                            <ul class="list-unstyled"> 
                                 <li >
                                    <router-link :to="'/Reserva-online'">
                                        ¡Reserva ahora!
                                    </router-link>
                                </li>                         
                                <li>
                                    <router-link exact :to="{ name: 'hotel', params: { key: '-Ld4kdUfsXiocoWudFnt' } }">
                                        El Tambo Uno
                                    </router-link> 
                                </li>
                                <li>
                                    <router-link exact :to="{ name: 'hotel', params: { key: '-Ld4kk5Ev7o_UCdDayty' } }">
                                        El Tambo Dos
                                    </router-link> 
                                </li>
                                <li>
                                    <router-link exact :to="{ name: 'hotel', params: { key: '-LsgpNGN1Ml4b4UL-Dti' } }">
                                        El Tambo dos de Mayo
                                    </router-link> 
                                </li>                                
                            </ul>
                        </div>                        
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="col-md-12"><h3 class="footer-heading mb-4 text-white">Encuentranos también en:</h3></div>
                    <div class="col-md-12">
                        <p>                            
                            <a title="Facebook" target="_blank" href="https://www.facebook.com/Hoteles-El-Tambo-105795394231178" class="pb-2 pr-2 pl-0"><span class="icon-facebook"></span></a>
                            <a title="Instagram" target="_blank" href="https://www.instagram.com/eltamboperu/" class="p-2"><span class="icon-instagram"></span></a>
                            <!--<a href="#!" class="p-2"><span class="icon-vimeo"></span></a>-->
                        
                            <a title="TripAdvisor El Tambo" target="_blank" href="https://www.tripadvisor.com.pe/Hotel_Review-g294316-d1067450-Reviews-El_Tambo-Lima_Lima_Region.html" class="p-2"><span class="icon-tripadvisor"></span></a>
                            <a title="TripAdvisor El Tambo Dos" target="_blank" href="https://www.tripadvisor.com.pe/Hotel_Review-g294316-d6548540-Reviews-El_Tambo_Dos-Lima_Lima_Region.html" class="p-2"><span class="icon-tripadvisor"></span></a>
                            <a title="TripAdvisor El Tambo Dos de Mayo" target="_blank" href="https://www.tripadvisor.com.pe/Hotel_Review-g294316-d9721720-Reviews-Tambo_Dos_de_Mayo-Lima_Lima_Region.html" class="p-2"><span class="icon-tripadvisor"></span></a>
                        </p>
                    </div>
                     <div class="col-md-12">
                        <router-link :to="'/'" >
                            <img src='@/assets/logo3.png' alt="El Tambo">                                
                        </router-link>
                     </div>
                </div>
            </div>
            <div class="row pt-5 mt-5 text-center">
                <div class="col-md-12">
                    <p>
                        Copyright &copy; 2020 Hotel El Tambo Todos los derechos reservados | Powered by <strong><a href="https://www.chevere.tech" target="_blank">ChevereTech</a></strong>
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