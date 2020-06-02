<template>
  <div v-if="totalAmount > 0" class="cart">
    <div class="cart__filled">
      <div class="cart__contents">
        <position v-for="position in cart" :key="position.id" :position="position" :is-contrast="isContrast" />
      </div>
      <div class="cart__total">
        <div class="cart__total-label">Всего</div>
        <div class="cart__total-sum">{{ numberWithSpaces(totalCost) }} ₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { numberWithSpaces } from '@/utils/index.js';
import Position from './Position.vue';

export default {
  name: 'Cart',
  components: {
    Position,
  },
  props: {
    isContrast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['totalCost', 'totalAmount']),
    ...mapState(['cart']),
    isCartOpen() {
      return this.$store.state.page.isCartOpen;
    },
  },
  methods: {
    ...mapActions(['changeAmount', 'closeCart']),
    numberWithSpaces,
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';
.cart {
  display: flex;
  flex-direction: column;
  padding: 20px 24px;

  &__empty {
    text-align: center;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    font-weight: 500;
  }
}
</style>
