<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue2.js App"/>
    <!-- <h1>我是vue2</h1> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#app {
  color: #2c3e50;
  height: calc(100% - 61px);
  width: 100%;
}
</style>
