<template>
  <div id="app">
    <section class="page" v-touch:swipe.right="openMenu" v-touch:swipe.left="closeMenu">
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
        <navigation iscompact="isCompact" />
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
        <div class="cart-popup" v-if="page.isCartOpen">
          <div class="cart-popup__title">Корзина</div>
          <cart iscompact="isCompact" />
         <order />
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import Product from '@/components/product';
import Navigation from '@/components/Navigation';
import Info from '@/components/Info';
import Cart from '@/components/cart';
import Order from '@/components/Order';
import Status from '@/components/cart/Status';
import AppFooter from '@/components/AppFooter';
import Logo from '@/components/Logo';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Product,
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
  box-sizing: border-box;
  padding-bottom: 56px;
  min-height: 100vh;
}

@include from-breakpoint('xl') {
  .page {
    margin-right: 300px;
    padding-bottom: 0;
    padding-top: 66px;
  }
}

.desktop-panel {
  @include fixed-overlay;
  left: auto;
  width: 300px;
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
  background: $color-background--contrast;
  color: $color-text--contrast;
}

.cart-popup {
  position: fixed;
  top: 50%;
  left: calc(50% - 150px);
  transform: translate(-50%, -50%);
  max-width: 680px;
  width: 100%;
  padding: $base 0;
  background: $color-background;
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
