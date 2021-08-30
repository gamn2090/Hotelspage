<template>
    <footer class="site-footer">
        <div class="container footer">
            <div class="row">   
                <div class="col-md-2">                    
                    <center>
                        <router-link :to="'/'" >
                            <img class="imagenFooterHotel" src='@/assets/tamboBlanco.png' alt="El Tambo">                                
                        </router-link>
                    </center>                    
                </div>             
                <div class="col-md-2">
                    <center>
                        <h3 class="footer-heading text-white">{{$t('Footer["MenuRapido"]["Titulo"]')}}</h3><br>
                        <ul class="list-unstyled"> 
                            <li>
                                <router-link :to="'/'">
                                    {{$t('Footer["MenuRapido"]["link1"]')}}
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
                    </center>     
                </div>
                <div class="col-md-2">
                    <center>
                        <h3 class="footer-heading mb-4 text-white">{{$t('Footer["Siguenos"]["Titulo"]')}}:</h3>
                        <p>                            
                            <a title="Facebook" target="_blank" href="https://www.facebook.com/hoteleseltambope" class="pb-2 pr-2 pl-0 ">
                                <span class="icon-facebook socialLinks"></span>
                            </a>
                            <a title="Instagram" target="_blank" href="https://www.instagram.com/hoteleseltamboperu/" class="p-2 ">
                                <span class="icon-instagram socialLinks"></span>
                            </a>
                            <a title="Linkedin" target="_blank" href="https://www.linkedin.com/company/hoteles-el-tambo-per%C3%BA" class="p-2 ">
                                <span class="icon-linkedin socialLinks"></span>
                            </a>
                            <!--<a href="#!" class="p-2"><span class="icon-vimeo"></span></a>-->
                        </p>
                    </center>
                </div>             
                <div class="col-md-2">
                    <center><h5 class="FooterTittle" style="color:white">Tambo 1</h5>
                    <p>
                        <font-awesome-icon icon="map-marker-alt" class="text-white"/> 
                        Av. La Paz 1276<br> Miraflores
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 1 219-4080
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 948-906-246
                    </p>
                    <p> 
                        <font-awesome-icon icon="envelope" class="text-white"/>
                        reservas@eltamboperu.com
                    </p></center>
                </div>
                <div class="col-md-2">
                    <center><h5 class="FooterTittle" style="color:white">Tambo 2</h5>
                    <p>
                        <font-awesome-icon icon="map-marker-alt" class="text-white"/>
                        Av. La Paz 720<br> Miraflores
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 1 200-0100
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 948-906-246
                    </p>
                    <p> 
                        <font-awesome-icon icon="envelope" class="text-white"/>
                        reservas2@eltamboperu.com
                    </p></center>
                </div>
                <div class="col-md-2">
                    <center><h5 class="FooterTittle" style="color:white">Tambo 2 de Mayo</h5></center>
                    <center><p>
                        <font-awesome-icon icon="map-marker-alt" class="text-white"/> 
                        Calle 2 de Mayo 494 Miraflores
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 1 241-3130
                    </p>
                    <p> 
                        <font-awesome-icon icon="phone-alt" class="text-white"/>
                        +51 948-906-246
                    </p>
                    <p> 
                        <font-awesome-icon icon="envelope" class="text-white"/>
                        reservas@hoteldosdemayo.com
                    </p></center>
                </div>
            </div>
            <div class="row pt-5 mt-5 text-center" style="margin-top:15px !important">
                <div class="col-md-12">
                    <p>
                        Copyright &copy; {{$t('Footer["CopyRight"]')}} | Powered by <strong><a href="https://www.chevere.tech" target="_blank">ChevereTech</a></strong>
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

<style scoped>
.socialLinks{
    color:white !important;
    font-size: 20px !important;
}
.footer{
    font-size: 12px !important;
}
.imagenFooterHotel{
    width: 100%
}
.FooterTittle{
    font-size: 14px !important;
}
@media only screen and (max-width: 750px) {
    .imagenFooterHotel{
        width: 60% ;
    }
}
</style>