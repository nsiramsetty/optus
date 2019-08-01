import 'es6-promise/auto';
import Vue from 'vue';
import Axios from 'axios';
import VueForm from 'vue-form';
import Element from 'element-ui';
import BootstrapVue from 'bootstrap-vue'
import {sync} from 'vuex-router-sync';
import VueCookies from 'vue-cookies';
import App from './_view/App.vue';
import router from './_router';
import store from './_store';
import {loadProgressBar} from 'axios-progress-bar';
import {LOADER_CONFIG} from "./_config/LoaderConfig";
import Toastr from 'vue-toastr';
import {TOASTR_CONFIG} from "./_config/ToastrConfig";

Vue.use(Element);
Vue.use(BootstrapVue);
Vue.use(VueForm);
Vue.use(VueCookies);
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
Vue.use(Toastr, TOASTR_CONFIG);
loadProgressBar(LOADER_CONFIG);

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  created: function () {
    window.Vue = this
  },
  template: '<App/>',
  components: {App}
});
