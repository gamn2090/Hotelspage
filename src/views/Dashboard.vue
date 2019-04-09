<template>
  <span>    
      <my-header></my-header>
      <div class="main-content">
        <my-sidebar></my-sidebar>
        <router-view></router-view> 
      </div> 
  </span>
</template>

<script>
import MyDashboard from "@/components/Admin/Dashboard";
import MyHeader from "@/components/Admin/Header";
import MySidebar from "@/components/Admin/Sidebar";

export default {
  name: "Dashboard",
  components: {    
    MyDashboard,
    MyHeader,
    MySidebar
  }
};
</script>

<style scoped> 

</style>