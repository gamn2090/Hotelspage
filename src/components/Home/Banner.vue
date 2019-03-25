<template>
    <div class="slide-one-item home-slider owl-carousel">
        <div class="site-blocks-cover overlay" style="background-image: url(./assets/images/hero_1.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-7 text-center" data-aos="fade">
                        <h1 class="mb-2">Bienvenido a Hoteles el Tambo</h1>
                        <h2 class="caption">Disfrute del Perú</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-blocks-cover overlay" style="background-image: url(./assets/images/hero_2.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-7 text-center" data-aos="fade">
                        <h1 class="mb-2">Experiencia Extraordinaria</h1>
                        <h2 class="caption">Disfrute con nosotros</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-blocks-cover overlay" style="background-image: url(./assets/images/hero_3.jpg);" data-aos="fade" data-stellar-background-ratio="0.5">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-7 text-center" data-aos="fade">
                        <h1 class="mb-2">Habitaciones relajantes</h1>
                        <h2 class="caption">Su habitación, sus reglas</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner",
    data () {
      return {
        
      }
    }, mounted () {
        if ($('.slide-one-item').length > 0) { $('.slide-one-item').owlCarousel({ center: false, items: 1, loop: true, stagePadding: 0, margin: 0, autoplay: true, pauseOnHover: false, animateOut: 'fadeOut', animateIn: 'fadeIn', nav: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'] }); }
    }
};
</script>

</style>