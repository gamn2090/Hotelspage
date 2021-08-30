<template>
 <!-- Your Chat Plugin code -->
    <div id="fb" class="fb-customerchat"
    attribution="setup_tool"
    page_id="128793543821467">
    </div>
</template>

<script>
export default {
  name: "Whatsapp"  
};
</script>

<style scoped>
.fb_reset>div {
  position: fixed;
  width: 150px !important;
  height: 150px !important;
  display: block;
  bottom: 8%;
  right: 5%;      
  z-index: 999;
  cursor: pointer;
}
</style>
