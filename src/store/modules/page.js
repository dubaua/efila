/* eslint-disable no-shadow */
const state = {
  isMenuOpen: false,
  isCartOpen: false,
  isFrozen: false,
  nextAction: null,
  zoomedImage: null,
};

const getters = {
  isOverlayed: state => state.isCartOpen || state.isMenuOpen,
  isZoomed: state => state.zoomedImage !== null,
};

const mutations = {
  setMenu(state, payload) {
    state.isMenuOpen = payload;
  },
  setCart(state, payload) {
    state.isCartOpen = payload;
  },
  scheduleAction(state, payload) {
    state.nextAction = payload;
  },
  zoomImage(state, payload) {
    state.zoomedImage = payload;
  },
  closeImage(state) {
    state.zoomedImage = null;
  },
};

const actions = {
  openMenu({ commit }) {
    commit('setMenu', true);
  },
  closeMenu({ commit }) {
    commit('setMenu', false);
  },
  toggleMenu({ state, commit }) {
    commit('setMenu', !state.isMenuOpen);
  },
  openCart({ commit }) {
    commit('setCart', true);
  },
  closeCart({ commit }) {
    commit('setCart', false);
  },
  toggleCart({ state, commit }) {
    commit('setCart', !state.isCartOpen);
  },
  closeAll({ commit }) {
    commit('setCart', false);
    commit('setMenu', false);
  },
  scheduleAction({ state, commit, dispatch }, { next, blocking }) {
    if (state[`is${blocking}Open`]) {
      commit('scheduleAction', next);
      commit(`set${blocking}`, false);
    } else {
      dispatch(next);
    }
  },
  dispatchNext({ state, commit, dispatch }) {
    if (state.nextAction) {
      dispatch(state.nextAction);
      commit('scheduleAction', null);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
