<template>
    <div class="header">
        <center><img src="~@/assets/logo3.png" alt="adminicon" id="image">
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
        background-color: #fef9e9;
        color: black;
        border-bottom: 2px solid black;
    }
    #image{
        height: 80px;
        background-color: #26180b;
    }
</style>
