<template>
  <span>    
    <my-header></my-header>
    <my-dashboard></my-dashboard>    
  </span>
</template>

<script>
import MyDashboard from "@/components/Admin/Dashboard";
import MyHeader from "@/components/Admin/Header";

export default {
  name: "Dashboard",
  components: {    
    MyDashboard,
    MyHeader
  }
};
</script>

<style scoped> 

</style>