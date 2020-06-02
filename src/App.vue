<template>
  <div id="app">
    <section v-touch:swipe.left="openCart" v-touch:swipe.right="openMenu" class="page">
      <router-view />
    </section>
    <template v-if="page.isMobile">
      <slide-in direction="right" :is-active="page.isMenuOpen" swipe-action="closeMenu">
        <the-menu :items="menuItems" />
      </slide-in>
      <slide-in direction="left" :is-active="page.isCartOpen" swipe-action="closeCart" title="Ваш заказ">
        <cart is-contrast />
        <order is-contrast />
        <empty-cart />
      </slide-in>
      <app-footer />
    </template>
    <template v-else>
      <aside class="desktop-panel">
        <logo class="desktop-panel__logo" />
        <info />
        <div class="desktop-panel__cart">
          <cart />
          <status />
        </div>
      </aside>
      <header class="desktop-header">
        <the-menu :items="menuItems" />
      </header>
    </template>
    <overlay />
    <transition name="fade">
      <div v-if="!page.isMobile && page.isCartOpen" class="cart-popup">
        <div class="cart-popup__title">Ваш заказ</div>
        <cart />
        <order />
        <empty-cart />
      </div>
    </transition>
    <zoom />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { debounce } from 'throttle-debounce';
import AppFooter from '@/components/AppFooter.vue';
import Cart from '@/components/cart/Cart.vue';
import EmptyCart from '@/components/EmptyCart.vue';
import Info from '@/components/Info.vue';
import Logo from '@/components/Logo.vue';
import Order from '@/components/Order.vue';
import Overlay from '@/components/Overlay.vue';
import SlideIn from '@/components/SlideIn.vue';
import Status from '@/components/cart/Status.vue';
import TheMenu from '@/components/TheMenu.vue';
import Zoom from '@/components/Zoom.vue';
import { MOBILE_THRESHOLD } from '@/settings.js';
import { getCollectionByKey, sendForm } from '@/api/index.js';

export default {
  name: 'App',
  components: {
    Cart,
    Order,
    Status,
    AppFooter,
    Logo,
    Info,
    TheMenu,
    Zoom,
    EmptyCart,
    SlideIn,
    Overlay,
  },
  data() {
    return {
      menuItems: [],
    };
  },
  computed: {
    ...mapState(['page']),
    ...mapGetters(['somePanelsIsOpen', 'isZoomed']),
    getYear() {
      return new Date().getFullYear();
    },
  },
  async created() {
    window.addEventListener('resize', debounce(160, this.onWindowSizeChange));
    window.addEventListener('orientationchange', this.onWindowSizeChange);

    this.menuItems = await getCollectionByKey({
      key: 'menu',
      filter: {
        published: true,
      },
    });
  },
  methods: {
    ...mapMutations(['setMobile']),
    ...mapActions(['scheduleAction', 'closeMenu', 'closeCart']),
    openCart() {
      if (this.page.isMobile) {
        this.scheduleAction({ next: 'openCart', blocking: 'Menu' });
      }
    },
    openMenu() {
      if (this.page.isMobile) {
        this.scheduleAction({ next: 'openMenu', blocking: 'Cart' });
      }
    },
    onWindowSizeChange() {
      this.setMobile(window.innerWidth < MOBILE_THRESHOLD);
    },
  },
};
</script>

<style lang="scss">
@import './styles/_globals';

$panel-width: 320px;

.page {
  box-sizing: border-box;
  padding-bottom: $--header-height;
  min-height: 100vh;
  background: $--color-gray-contrast-75;
  color: $--color-gray-contrast-900;
}

@include from('xl') {
  .page {
    margin-left: $panel-width;
    padding-bottom: 0;
    padding-top: $--header-height;
  }
}

.desktop-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  top: $--header-height;
  width: $panel-width;
  display: flex;
  flex-direction: column;
  background: $--color-gray-75;
  &__cart {
    margin-top: auto;
    overflow: auto;
  }
}

.desktop-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.cart-popup {
  $popup-width: 640px;
  position: fixed;
  box-sizing: border-box;
  top: 5vh;
  left: calc(50% - #{$popup-width * 0.5});
  max-width: 640px;
  max-height: 90vh;
  width: 100%;
  padding: 16px 0;
  overflow: auto;
  background: $--color-gray-50;
  color: $--color-gray-900;

  &__title {
    text-align: center;
    font-size: $--font-size-300;
    font-family: $--font-face-title;
  }
}
</style>
