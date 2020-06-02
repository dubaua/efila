import 'normalize.css';
import './webfonts/stylesheet.css';
import '@/styles/main.scss';
// import 'vue-form-generator/dist/vfg.css';
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import VueFormGenerator from 'vue-form-generator';
import App from './App.vue';
import router from '@/router.js';
import store from '@/store/index.js';

const isDev = process.env.NODE_ENV === 'development';

Vue.config.productionTip = isDev;

Vue.use(VueFormGenerator);
Vue.use(Vue2TouchEvents);

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
