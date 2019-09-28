<template>
  <div id="app">
    <div id="nav">

      <el-card class="box-card tarjeton" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Datos</span>
      </div>
      <form v-on:submit.prevent="addLink">
          <el-input placeholder="Digite" type="text" v-model="newLink.title"></el-input>
          <el-input placeholder="Digite" type="text" v-model="newLink.author"></el-input>
          <el-input placeholder="Digite" type="text" v-model="newLink.url"></el-input>
          <!-- <el-input type="submit" plain>Listo</el-input> -->
          <el-button type="primary" v-on:click="addLink" >Listo</el-button>
      </form>

      
    </el-card>
      <hr>
        <el-card class="box-card tarjeton" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Lista de datos</span>
      </div>
      <!-- <el-table 
      :data="links"
      style="width: 100%">
      <el-table-column 
        prop="title"
        label="Title"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="Url">
      </el-table-column>
    </el-table> -->

    <div v-for="link in links" :key="link.key">
      <p>{{link.title}}</p>
    </div>

    <div v-for="link in links" :key="link.key">
      <p>{{link.author}}</p>
    </div>

    <div v-for="link in links" :key="link.key">
      <p>{{link.url}}</p>
    </div>

     <el-button type="danger" icon="el-icon-delete" circle
           v-on:clik="deletelink(link)" >

    </el-button>

    

    </el-card>
      <!-- <router-link to="/">
        <el-button type="primary">Home</el-button>
      </router-link>| -->
      <!-- <router-link to="/about">
        <el-button type="danger" disabled>About</el-button>
      </router-link> -->
    </div>

    <!-- <router-view /> -->
  </div>
</template>

<script>
import Firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyCjo04sni3QnO3ps6TJg5MvFyIzaycaiBo",
    authDomain: "clase3-e954a.firebaseapp.com",
    databaseURL: "https://clase3-e954a.firebaseio.com",
    projectId: "clase3-e954a",
    storageBucket: "",
    messagingSenderId: "821331513907",
    appId: "1:821331513907:web:852944873596b746434946",
    measurementId: "G-VCXK39SL64"
  };

let app = Firebase.initializeApp(firebaseConfig)
let db = app.database()

let linksRef = db.ref('links');

// let prueba = db.ref('links/').on('value',function(snapshot)){
//   console.log(prueba)
// }
console.log(linksRef)
export default {
  name : 'app',
  firebase : {
    links : linksRef
  }, 
  data (){
    return {
      newLink: {
        title: '',
        author: '',
        url: ''
      },
      links: [{
        title: '',
        author: '',
        url: ''
      }]
    }
  },
  methods: {
    addLink:function  () {
      linksRef.push(this.newLink)
      this.newLink.title= '';
      this.newLink.author= '';
      this.newLink.url= '';
    },
     deletelink: function (link){
       linksRef.child(link['.key']).remove();
     }

  },
  created() {
    linksRef.on("value",e => {
      this.links = e.val();
      console.log(this.links)
    })
  }
}

</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

#app {
  padding: 0;
  margin: 0;
}


</style>
