<template>
  <div id="app">
    <VueThree />
  </div>
</template>

<script>
import VueThree from "./components/VueThree.vue";

export default {
  name: "app",
  components: {
    VueThree
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
