<script setup lang="ts">
  import TypingArea from './components/TypingArea/TypingArea.vue';
  import Navbar from './components/Navbar.vue';
  import Github from './components/Github.vue';
</script>
<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <TypingArea></TypingArea>
  </main>
  <footer>
    <Github></Github>
  </footer>
</template>
<style scoped>
main{
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    font-size: 30px;
    margin: 0 100px;
    text-align: left;
}
header{
    display: flex;
    align-items: center;
    gap: 20px;
}
</style>
<script lang="ts">
  export default {
    name: "App",
  };
</script>
