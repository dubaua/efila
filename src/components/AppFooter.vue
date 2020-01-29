<template>
  <div class="footer">
    <button class="footer__button" @click="scheduleAction({ next: 'toggleMenu', blocking: 'Cart' })">
      <div class="hamburger hamburger--squeeze" :class="{ 'is-active': page.isMenuOpen }">
        <div class="hamburger-box">
          <div class="hamburger-inner" />
        </div>
      </div>
    </button>
    <router-link class="footer__logo" to="/" @click.native="closeAll">
      <icon glyph="logo-compact" :width="214" :height="48" />
    </router-link>
    <button class="footer__button cart-button" @click="scheduleAction({ next: 'toggleCart', blocking: 'Menu' })">
      <div v-if="totalAmount" class="cart-button__label">
        {{ cartLabel }}
      </div>
      <icon glyph="shopping-cart" :width="48" :height="48" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'AppFooter',
  computed: {
    ...mapState(['page']),
    ...mapGetters(['totalAmount']),
    cartLabel() {
      return this.totalAmount > 9 ? '9+' : this.totalAmount;
    },
  },
  methods: {
    ...mapActions(['scheduleAction', 'closeAll']),
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';
@import '../styles/hamburger';

.footer {
  position: fixed;
  bottom: 0;
  height: 48px;
  left: 0;
  padding: 4px 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  background: $color-background--contrast;

  &__button {
    max-width: $base * 4;
    flex-basis: $base * 4;
    text-align: center;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;

    & .icon {
      fill: $color-text--contrast;
    }
  }
  &__logo {
    flex-grow: 1;
    text-align: center;
    fill: $color-text--contrast;
    svg {
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.cart-button {
  position: relative;

  &__label {
    position: absolute;
    top: 9px;
    right: 12px;
    width: 13px;
    height: 13px;
    padding: 1px;
    border-radius: 50%;
    color: $color-text--contrast;
    background: $color-primary;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
  }
}
</style>
