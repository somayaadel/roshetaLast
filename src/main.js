/**
 * main setups
 * */

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import Multiselect from 'vue-multiselect'
import './http.js' // create axios http - use token login

/**
 * import plugins
 */
import './plugins/jquery.js'
import 'bootstrap'
import './plugins/sweetalert.js'
import './plugins/select-libs.js'
// import './plugins/draggable.js's
import './plugins/buefy.js'
import './plugins/vulidate.js'
import RichTextEditor from 'rich-text-editor-vuetify'

 
Vue.use(RichTextEditor)
 

 
Vue.component('multiselect', Multiselect)

import vuetify from './plugins/vuetify';


/**
 * global functions
 */
import './plugins/custom-global-functions.js'




/**
 * import main scss
 */
import '@/assets/sass/main.scss'


import store from './store'


// Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
