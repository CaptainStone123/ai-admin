<script  >
</script>
<template>
    <nav class="navbar">
        <ul>
            <img src="../assets/UA-Logo.png" alt="">
            <li><b>UA Chat Assistant</b></li>
        </ul>
        <ul>
            <li><a class="primary-button" href="">Account</a></li>
        </ul>
     </nav> 
</template>

<style scoped>
.navbar {
    background-color: #042134; color: white;
    position: fixed; top: 0; z-index: 100;
    height: 4.5rem; width: 100vw;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem 0 2rem;
}
.navbar ul{
    display: flex; align-items: center;
 }
.navbar ul li{
    padding: 0 .6rem 0 .6rem;
}
.navbar ul li a:hover{
    color: #EBC20C;
}
img{
    height: 3rem;
}
</style>

 