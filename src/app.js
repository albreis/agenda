import Vue from 'vue';
import App from './App';
import '@fortawesome/fontawesome-free/js/fontawesome';
import axios from './Request.js';
import Auth from './auth.js';
import router from './routes.js';
import Vuex from 'vuex'
import * as firebase from "firebase";


Vue.use(Vuex)


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAgHoq7q0qyqEdf0H43Or2oH4mAwX0AigI",
  authDomain: "rifa-bd87e.firebaseapp.com",
  databaseURL: "https://rifa-bd87e.firebaseio.com",
  projectId: "rifa-bd87e",
  storageBucket: "rifa-bd87e.appspot.com",
  messagingSenderId: "687064166917",
  appId: "1:687064166917:web:f2d9c9ab7f5bb005e2e26c",
  measurementId: "G-CMZRWQQYMG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase

Vue.prototype.$db = firebase.firestore()

Vue.prototype.$http = axios
Vue.prototype.$auth = Auth
Vue.prototype.$categories = []

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate()+days);
  return this;
}
Date.prototype.subDays = function(days) {
  this.setDate(this.getDate()-days);
  return this;
}

const bus = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Object.defineProperty(Vue.prototype, '$bus', {
    get(){
        return this.$root.bus;
    },
    set(newInstance){
        this.$root.bus = newInstance;
    },
});