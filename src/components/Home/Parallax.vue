<template>
    <span>
        <div class="py-5 upcoming-events" :style="{backgroundImage: 'url(' + require('@/assets/img_8.jpg')+')',
                                                backgroundAttachment:'fixed',
                                                height:'60vh', 
                                                backgroundSize: 'cover' }">
            <div style="height:100%" class="container">
                <div style="text-align:center;position:relative;height:100% " class="row align-items-center ">
                    <div class="col-md-12 vertically-centered">
                        <h2 style="display:inline-block" class="text-white stroke">¡Disfrute de lo mejor de Lima en nuestros hoteles!</h2>
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
    .vertically-centered{
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .stroke{
        background-color:rgba(81, 81, 81, .5);
        padding:20px;
    }
</style>