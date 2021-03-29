<template>
    <div class="site-section  beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5 bannerFont">Ubícanos</h2>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-lg-3 mb-2">
                    <a href="javascript:;" v-on:click="selectMap('00')" class="button-map-select d-block text-center font-weight-bold text-dark">Todos los hoteles</a>
                </div>
                <div class="col-12 col-lg-3 mb-2" v-for="hotel in hotels" :key="hotel.key">
                    <a href="javascript:;" @click="selectMap(hotel.key)" class="button-map-select d-block text-center font-weight-bold text-dark">
                        {{ hotel.name }}
                    </a>
                </div>          
            </div>
            <div class="row">
                <div class="col-md-12">
                    <GmapMap  
                    :options="{
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: false,
                        streetViewControl: true,
                        rotateControl: false,
                        fullscreenControl: true,
                        disableDefaultUi: true
                    }"
                        :center="center"
                        :zoom="15"
                        map-type-id="terrain"
                        style="width: 80%; height: 60vh; margin: auto; margin-bottom: 1rem; margin-top: 25px; min-height: 300px; max-height: 500px;"
                        >
                            <gmap-info-window                       
                                :options="infoOptions"
                                :position="infoPosition"
                                :opened="infoOpened"
                                @closeclick="infoOpened=false">
                                {{infoContent}}
                            </gmap-info-window>

                            <GmapMarker                      
                                v-for="(m, index) in visibleMarkers"
                                :key="`index-${index}`"
                                :position="m.position"
                                :clickable="true"
                                :draggable="false"                                
                                @click="toggleInfo(m, index)"
                            />
                            </GmapMap>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Maps",
    data () {
      return {
        infoPosition: null,
        infoContent: null,
        infoOpened: false,
        infoCurrentKey: null,
        infoOptions: {
            pixelOffset: {
                width: 0,
                height: -35
            }
        },
        hotelSelected: null,
        center: {lat: -12.1208012, lng: -77.0292627},
        centerAlways: {lat: -12.1208012, lng: -77.0292627},
        markers: []
      }
    },
    computed:{
        hotels () {
            return this.$store.state.hotels;
        },
        visibleMarkers() {
            if (this.hotelSelected == "00" || this.hotelSelected == null ) {
                this.center = this.centerAlways;
                return this.markers;
            }

            let markerSelected = this.markers.filter(a => a.key == this.hotelSelected);
            this.center = {lat: markerSelected[0].position.lat, lng: markerSelected[0].position.lng};
            return markerSelected;

        }
    },
    methods:{
        getGmapsMarkers() {
            this.hotels.forEach(element => {
                const position = {lat: Number.parseFloat(element.latitud), lng: Number.parseFloat(element.longitud)};
                const label = {text:element.name,color:"black",fontSize:"16px",fontWeight:"bold"};
                const key = element.key;
                const info = {position, label, key};
                this.markers.push(info);
            });
        },
        selectMap(key) {
            this.hotelSelected = key;
        },
        getPosition: function(marker) {
            return {
                lat: parseFloat(marker.position.lat),
                lng: parseFloat(marker.position.lng)
            }
        },      
        toggleInfo: function(marker, key) {
            //solo debe haber un infobox
            this.infoPosition = this.getPosition(marker);
            this.infoContent = marker.label.text;
            if (this.infoCurrentKey == key) {
                this.infoOpened = !this.infoOpened;
            } else {
                this.infoOpened = true;
                this.infoCurrentKey = key;
            }
        },
    },
    created() {
        this.getGmapsMarkers();
    },
}
</script>

<style scoped>
    .button-map-select{
        border-radius: 25px;
        border: 2px solid rgb(11,119,61);
        padding:10px;
    }    
    .padding-top{
        margin-Top:60%;
    }
    .vue-map-container{
        width:100% !important;
        margin-right: 0px !important;
        margin-bottom: 0px !important;
    }
    .beige-backgound{
        padding-bottom: 0px !important;
        margin-bottom: 0px !important;
    }
    @media (min-width: 1200px){
        .container {
            max-width: 100%;
        }
            }
    @media (min-width: 992px){
        .container {
            max-width: 100% !important;
        }
      
    }
    @media (min-width: 768px){
        .container {
            max-width: 100% !important;
        }
       
    }
    @media (min-width: 576px){
        .container {
            max-width: 100% !important;
        }
       
    }
</style>