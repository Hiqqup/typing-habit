<script setup lang="ts">
  import TypingArea from './components/TypingArea/TypingArea.vue';
  import Navbar, { MainContent } from './components/Navbar.vue';
  import Github from './components/Github.vue';
  import Settings from "./components/Settings.vue";
</script>
<template>
  <header>
    <Navbar 
      @show_in_main="show => showInMain = show"
    ></Navbar>
  </header>
  <main>
    <TypingArea v-if="showInMain === MainContent.Typing"></TypingArea>
    <Settings v-if="showInMain === MainContent.Settings"></Settings>
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
    data(){
      return{
        showInMain: MainContent.Typing,
      }
    },
  };
</script>
