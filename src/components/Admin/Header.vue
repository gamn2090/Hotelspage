<template>
    <div class="header">
        <center><img src="./../../../public/assets/images/admin_icon.png" alt="adminicon" id="image">
        <br>¡Bievenido al Panel de Administración!</center>
    </div>    
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
        }
    }
}
</script>

<style>
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
</style>
