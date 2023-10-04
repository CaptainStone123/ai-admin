<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <section>
    <header>
      <nav>
        <Sidebar/> 
        <Navbar/> 
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <body>
      <RouterView />
    </body>
  </section>
</template>

<style scoped>
 
</style>
