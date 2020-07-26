<template>
    <div class="site-section  beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5">Encuéntranos</h2>
                </div>
            </div>
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
                :zoom="14"
                map-type-id="terrain"
                style="width: 80%; height: 60vh; margin: auto; margin-bottom: 1rem; margin-top: 25px; min-height: 300px; max-height: 500px;"
                >
                    <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                    />
            </GmapMap>
        </div>
    </div>
</template>

<script>
export default {
    name: "Maps",
    data () {
      return {
        center: {lat: -12.1177683, lng: -77.0337438},
        markers: [{
            position: {lat: -12.126204, lng: -77.0327693},
            label:{text:"El TAMBO UNO",color:"black",fontSize:"16px",fontWeight:"bold"}
            }, {
            position: {lat: -12.125064, lng: -77.0274805},
            label:{text:"El TAMBO II",color:"black",fontSize:"16px",fontWeight:"bold"}
            },{
            position: {lat: -12.117847, lng: -77.0333857},
            label:{text:"El TAMBO DOS DE MAYO",color:"black",fontSize:"16px",fontWeight:"bold"}
            }
        ]
      }
    }
}
</script>

<style >
    
</style>