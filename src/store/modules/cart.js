import Vue from 'vue';

const state = {};

const getters = {
  totalCost: (state) =>
    Object.keys(state).reduce(
      (sum, cartProductId) => sum + state[cartProductId].price * state[cartProductId].amount,
      0,
    ),
  totalAmount: (state) => Object.keys(state).reduce((sum, cartProductId) => sum + state[cartProductId].amount, 0),
  getAmountInCardById: (state) => (cartProductId) => (state[cartProductId] ? state[cartProductId].amount : 0),
};

const actions = {
  addToCart({ state, commit }, product) {
    if (typeof state[product.cartProductId] !== 'undefined') {
      commit('changeAmount', { cartProductId: product.cartProductId, modifier: 1 });
    } else {
      commit('addToCart', { ...product, amount: 1 });
    }
  },
  changeAmount({ state, commit }, { cartProductId, modifier }) {
    if (state[cartProductId].amount === -modifier) {
      commit('removeFromCart', cartProductId);
    } else {
      commit('changeAmount', { cartProductId, modifier });
    }
  },
};

const mutations = {
  addToCart(state, product) {
    Vue.set(state, product.cartProductId, product);
  },
  removeFromCart(state, cartProductId) {
    Vue.delete(state, cartProductId);
  },
  clearCart(state) {
    Object.keys(state).forEach((cartProductId) => Vue.delete(state, cartProductId));
  },
  changeAmount(state, { cartProductId, modifier }) {
    state[cartProductId].amount += modifier;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
