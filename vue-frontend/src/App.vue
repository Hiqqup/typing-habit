<script setup lang="ts">
  import TyingField from './components/TyingField.vue';
  import Navbar from './components/Navbar.vue';
  import Github from './components/Github.vue';
</script>
<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
  <TyingField></TyingField>
  </main>
  <footer>
    <Github></Github>
  </footer>
</template>

<script lang="ts">
  export default {
    name: "App",
  };
</script>
