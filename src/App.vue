<template>
  <div id="app">
  <Header  v-if="isLoggedIn"  />
  <!---->
    <router-view />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from "./components/includes/Header";
// import Footer from './components/includes/Footer'
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
   
  },
  mounted(){
    console.log(this.isLoggedIn)
  },
  data(){
    return{

    }
  },
  data() {
    return {};
  },
  components: {
    Header
    // Footer
  }
};
</script>

<style></style>
