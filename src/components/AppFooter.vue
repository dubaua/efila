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
      <icon class="cart-button__icon" glyph="shopping-bag" :width="48" :height="48" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Icon from '@/components/icon/Icon.vue';

export default {
  name: 'AppFooter',
  components: {
    Icon,
  },
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
@import '~@/styles/hamburger.scss';

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  padding: 4px 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  background: $--color-gray-contrast-50;

  &__button {
    max-width: 16px * 4;
    flex-basis: 16px * 4;
    text-align: center;
    border: 0;
    background: none;
    padding: 0;
    margin: 0;

    & .icon {
      fill: $--color-gray-900;
    }
  }

  &__logo {
    flex-grow: 1;
    text-align: center;
    fill: $--color-gray-900;
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
    top: 15px;
    left: 16px;
    width: 28px;
    height: 16px;
    box-sizing: border-box;
    color: white;
    font: 700 20px/20px monospace;

    &--overflow {
      font: 700 16px/18px monospace;
    }
  }

  &__icon {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
