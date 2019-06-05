<template>
  <div id="app">

      <router-view/>
      
  </div>
</template>

<script>
export default {
    name: 'App'    
}
</script>

<style>
  .help-icon{
       margin-left:0 !important;
       margin-top: 40px;
       transition-duration: 0.3s;
   }

   .help-icon:hover{
       cursor: pointer;
       font-size: 25px;
       color:red;
   }
</style>
