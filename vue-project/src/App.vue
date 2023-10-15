<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

</script>

<template>
  <section >
      <Sidebar/> 
      <Navbar/>
  
      <RouterView />
      
   </section>
</template>

<style scoped>
 
</style>
