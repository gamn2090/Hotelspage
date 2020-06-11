<template>
    <span>
        <div class="py-5 upcoming-events" :style="{backgroundImage: 'url(' + require('@/assets/img_8.jpg')+')',
                                                backgroundAttachment:'fixed',
                                                height:'300px', 
                                                backgroundSize: 'cover' }">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h2 class="text-white stroke">Conozca Lima de la mejor manera</h2>
                    </div>
                    <div class="col-md-6">
                        <span class="caption"></span>
                    </div>
                </div>
            </div>            
        </div>        
    </span>
</template>

<script>
export default {
    name: "Parallax",
    data () {
      return {
        
      }
    }
}
</script>

<style scoped>
    
</style>