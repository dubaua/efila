import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import cart from './modules/cart.js';
import page from './modules/page.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexPersist = new VuexPersist({
  key: '__VUEX_PERSIST_DVIJ__',
  strictMode: debug,
  storage: window.localStorage,
  modules: ['cart'],
});

const store = new Vuex.Store({
  modules: {
    cart,
    page,
  },
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  },
  plugins: [vuexPersist.plugin],
});

export default store;
