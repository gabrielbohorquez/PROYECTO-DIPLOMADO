<template>
  <div class="contenido">
    <h3>Clase 2</h3>
    <router-link to="/contacto">ir a contacto</router-link>
    <el-card class="box-card tarjeton" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Datos</span>
      </div>
      <el-input placeholder="Digite" v-model="busqueda"></el-input>
      <p>{{busqueda}}</p>
    </el-card>
    <el-alert
      title="Exitoso"
      type="success"
      effect="dark"
      show-icon
      description="Ha terminado con exito"
      @close="cierre"
    ></el-alert>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       busqueda: ""
//     };
//   },
//   methods: {
//     cierre() {
//       alert("ha cerrado el aviso");
//     }
//   },
//   mounted() {
//     console.log("hola desde mounted");
//   },

//   created() {
//     console.log("hola desde created");
//   },

//   destroyed() {
//     console.log("hola desde destroyed");
//   }
// };
</script>

<style scoped>
.tarjeton {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
}
</style>