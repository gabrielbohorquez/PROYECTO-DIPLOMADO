<template>
  <div class="row">
    <div class="col s6">
      <div
        class="card-panel center"
        style="padding: 24px !important; margin: 2.5rem 24px -6rem 26px !important;"
      >
        <div class="row">
          <div class="col s12">
            <div class="black-text">
              <h3 style="margin: -0.053333rem 0 1.168rem 0 !important;">{{ title }}</h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <label class="flow-text">DE :</label>
          </div>
          <div class="col s8">
            <currency-rates-list
              @changeRates="changeRates"
              :list="baseList()"
              name="base"
              :initialValue="base"
            ></currency-rates-list>
          </div>
        </div>
        <div class="row">
          <div class="col s3">
            <label class="flow-text">A :</label>
          </div>
          <div class="col s8">
            <currency-rates-list
              @changeRates="changeRates"
              :list="targetList()"
              name="target"
              :initialValue="target"
            ></currency-rates-list>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <label class="flow-text black-text">MONTO</label>
            <input
              class="center"
              min="1"
              @change="convertRates"
              @keyup="convertRates"
              type="number"
              name="base_amount"
              v-model="base_amount"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <h5 v-if="base_amount">{{base_amount}} {{base.name}} = {{target_amount}} {{target.name}}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <a
              class="waves-effect btn-large indigo darken-4"
              v-on:click="addLink"
            >Guardar</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col s6">
      <div
        class="card-panel center"
        style="padding: 24px !important; margin: 2.5rem 24px -6rem 26px !important;"
      >
        <div class="center" style="max-height:80%" >
          <table class="responsive-table centered">
            <thead>
              <tr>
                <th>Base de origen</th>
                <th>Monto</th>
                <th>Base convertida</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="link in links" :key="link.key">
                <td>{{link.base}}</td>
                <td>{{link.base_amount}}</td>
                <td>{{link.target}}</td>
                <td>{{link.target_amount}}</td>
                <a class="waves-light btn red accent-4" v-on:click="deletelink(link)">Eliminar</a>
              </tr>
            </tbody>

            <!-- <tbody>
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
                <td>$0.87</td>
                <td>
                  <a class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
                <td>$0.87</td>
                <td>
                  <a class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
                <td>$0.87</td>
                <td>
                  <a class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                  </a>
                </td>
              </tr>
            </tbody>-->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRates, convertRates } from "../helpers/api_fixer";
import CurrencyRatesList from "./CurrencyRatesList";

import Firebase from "firebase";

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

let app = Firebase.initializeApp(firebaseConfig);
let db = app.database();

let linksRef = db.ref("links");

export default {
  name: "currency",
  firebase: {
    links: linksRef
  },
  components: {
    CurrencyRatesList
  },
  data() {
    return {
      newLink: {
        base: "",
        target: "",
        base_amount: 1,
        target_amount: 1
      },
      links: {
        base: "",
        target: "",
        base_amount: 1,
        target_amount: 1
      },
      title: "Convertidor de Divisas",
      currency_list: [],
      base: "",
      target: "",
      base_amount: 1,
      target_amount: 1
    };
  },
  created() {
    getRates("EUR").then(res => {
      console.log(res);
      this.currency_list = res;
      this.base = res[0];
      this.target = res[1];
    }),
      linksRef.on("value", e => {
        this.links = e.val();
        if (this.links){
          Object.getOwnPropertyNames(this.links).forEach((val, idx, array) => {
            this.links[val].key = val
          })
        }
      });
  },
  methods: {
    addLink: function() {
      this.newLink.base = this.base.name;
      this.newLink.target = this.target.name;
      this.newLink.base_amount = '$' + this.base_amount;
      this.newLink.target_amount = '$' + this.target_amount;
      linksRef.push(this.newLink);
      // this.newLink.title= '';
      // this.newLink.author= '';
      // this.newLink.url= '';
    },
    deletelink: function (link){
       linksRef.child(link['key']).remove();
     },
    changeRates(val, name) {
      this[name] = val;
      this.convertRates();
    },
    convertRates() {
      if (!this.base_amount) {
        return;
      }

      convertRates(this.base.name, this.target.name).then(
        res => (this.target_amount = res * parseInt(this.base_amount, 10))
      );
    },
    baseList() {
      return this.currency_list.filter(
        currency => currency.name != this.target.name
      );
    },
    targetList() {
      return this.currency_list.filter(
        currency => currency.name != this.base.name
      );
    }
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
