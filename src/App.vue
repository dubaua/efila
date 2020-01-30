<template>
  <div id="app">
    <section v-touch:swipe.right="openMenu" v-touch:swipe.left="closeMenu" class="page">
      <router-view />
      <overlay />
    </section>
    <template v-if="isMobile">
      <slide-in direction="right" :is-active="page.isMenuOpen" swipe-action="closeMenu" title="Меню">
        <aside>
          <navigation />
          <info />
        </aside>
      </slide-in>
      <slide-in direction="up" :is-active="page.isCartOpen" swipe-action="closeCart" title="Корзина">
        <cart />
        <order />
      </slide-in>
      <app-footer />
    </template>
    <template v-else>
      <header class="desktop-header">
        <navigation is-compact />
      </header>
      <aside class="desktop-panel">
        <logo class="desktop-panel__logo" />
        <info />
        <div class="desktop-panel__cart">
          <cart />
          <status />
        </div>
      </aside>
      <transition name="fade">
        <div v-if="page.isCartOpen" class="cart-popup">
          <div class="cart-popup__title">Корзина</div>
          <cart is-compact />
          <order />
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Info from '@/components/Info';
import Cart from '@/components/cart';
import Order from '@/components/Order';
import Status from '@/components/cart/Status';
import AppFooter from '@/components/AppFooter';
import Logo from '@/components/Logo';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Cart,
    Order,
    Status,
    AppFooter,
    Logo,
    Info,
    Navigation,
  },
  computed: {
    ...mapState(['page']),
    ...mapGetters(['somePanelsIsOpen']),
    isMobile() {
      return window.innerWidth <= 1200;
    },
    getYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    ...mapActions(['scheduleAction', 'closeMenu', 'closeCart']),
    openMenu() {
      this.scheduleAction({ next: 'openMenu', blocking: 'Cart' });
    },
  },
};
</script>

<style lang="scss">
@import './styles/_globals';

.page {
  background: $color-background;
  color: $color-text;

  box-sizing: border-box;
  padding-bottom: 56px;
  min-height: 100vh;
}

$panel-width: 300px;

@include from-breakpoint('xl') {
  .page {
    margin-left: $panel-width;
    padding-bottom: 0;
    padding-top: 66px;
  }
}

.desktop-panel {
  @include fixed-overlay;
  left: right;
  width: $panel-width;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background: $color-background--contrast;
  color: $color-text--contrast;
  &__cart {
    margin-top: auto;
    overflow: auto;
  }
}

.desktop-header {
  @include fixed-overlay;
  bottom: auto;
  left: $panel-width;
}

.cart-popup {
  position: fixed;
  top: 50%;
  left: calc(50% - 150px);
  transform: translate(-50%, -50%);
  max-width: 680px;
  width: 100%;
  padding: $base 0;
  max-height: 100%;
  overflow: auto;

  &__title {
    text-align: center;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    font-size: $base * 1.25;
  }
}
</style>
