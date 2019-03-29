<template>
    <div class="site-section">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 class="mb-5">Encuentranos</h2>
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
    name: "Map",
    data () {
      return {
        center: {lat: -12.1259781, lng: -77.0328962},
        markers: [{
            position: {lat: -12.1259781, lng: -77.0328962},
            label:{text:"El Tambo UNO",color:"black",fontSize:"16px",fontWeight:"bold"}
            }
        ]
      }
    }
}
</script>

<style >
    
</style>