import api from '@/api/';
import { normalize, schema } from 'normalizr';

const product = new schema.Entity('products', {}, { idAttribute: '_id' });
const arrayOfProducts = [product];

/* eslint-disable no-shadow, no-return-assign, no-param-reassign */

const state = {
  pizza: null,
  sushi: null,
  wok: null,
  drinks: null,
};

// getters
const getters = {
  getProductsByKey: state => key => state[key],
};

// actions
const actions = {
  fetchProductsByKey({ commit }, key) {
    api.getProductsByKey(key).then(products => commit('setProducts', { products, key }));
  },
};

// mutations
const mutations = {
  setProducts(state, { products, key }) {
    state[key] = normalize(products, arrayOfProducts).entities.products;
  },
  setVersion(state, { product, productId, versionId }) {
    state[product][productId].chosenVersion = versionId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
