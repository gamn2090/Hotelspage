


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

 .header{
        width: 100%;
        height: 120px;
        background-color: black;
        color: white;
    }
    #image{
        height: 80px;
        background-color: white;
        border-radius: 50px;
    }
    .main-content{
        display: flex;
    }    
    .content{
        flex: 3;
        height: calc(100vh - 120px);
        background-color: #34495e;
        font-size: 20px;
        font-weight: bold;
    }
</style>