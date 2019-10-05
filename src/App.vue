<template>
  <div id="app" class="fondo-movimiento">
    <currency></currency>
  </div>
</template>
<script>
import Currency from "./components/Currency";
export default {
  components: {
    Currency
  }
};
</script>
<style>
body{
    background: url(https://www.toptal.com/designers/subtlepatterns/patterns/doodles.png) repeat 0 0;
    width: 100%;
    margin: 0;
    text-align: center;
    height: 100%;
    /* padding-top: 120px; */
    box-sizing: border-box;
    -webkit-animation: slide 20s ease-in-out infinite;
  }
  
  @-webkit-keyframes slide {
      from { background-position: 0 0; }
      to { background-position: -1000px 0; }
  }
</style>

