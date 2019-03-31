<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    
    <my-footer></my-footer>

  </div>
</template>

<script>
import Home from '@/views/Home';
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';

export default {
  name: 'App',
  components: {
      Home,
      Navbar,
      MyFooter
  }
}
</script>

<style>

</style>
