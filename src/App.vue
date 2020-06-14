<template>
  <div id="app">
    <GithubTop language="JavaScript" :date="date"/>
  </div>
</template>

<script>
  import GithubTop from './components/GithubTop.vue'

  const date = new Date().toISOString();

  export default {
    name: 'App',
    components: {
     GithubTop
    },
    data: function () {
      return {
        date: date
      }
    }
  }
</script>

<style>
  #app {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(130deg, #05397F 0%, #6EC1E4 80%);
    font-family: "Varela Round", Sans-serif;
  }
</style>
