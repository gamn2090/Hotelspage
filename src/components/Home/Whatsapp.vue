<template>
  <span>
    <a
      target="_blank"
      class="hidden-lg-and-up"
      href="https://wa.me/51948906246?text=Hola Hoteles el Tambo!, quisiera reservar"
      ><span id="whatsapp" style="font-size:36px" class="icon-whatsapp"></span></a
    >
    <a
      target="_blank"
      class="hidden-md-and-down"
      href="https://api.whatsapp.com/send?phone=51948906246&text=Hola Hoteles el Tambo!, quisiera reservar"
      ><span id="whatsapp" style="font-size:36px" class="icon-whatsapp"></span></a
    >
  </span>
</template>

<script>
export default {
  name: "Whatsapp"  
};
</script>

<style scoped>
#whatsapp {
  position: fixed;
  display: block;
  bottom: 6%;
  right: 5%;
  background-color: #25d366;
  color: white;
  padding: 8px;
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
}
</style>
