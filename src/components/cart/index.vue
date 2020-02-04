<template>
  <div class="cart">
    <div v-if="totalAmount === 0" class="cart__empty">Корзина пуста</div>
    <div v-else class="cart__filled">
      <div class="cart__contents">
        <position v-for="position in cart" :key="position.id" :position="position" :is-compact="isCompact" />
      </div>
      <div class="cart__total">
        <div class="cart__total-label">Всего</div>
        <div class="cart__total-sum">{{ totalCost }} ₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Position from './Position';

export default {
  name: 'Cart',
  components: {
    Position,
  },
  props: {
    isCompact: {
      type: Boolean,
      required: false,
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
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';
.cart {
  display: flex;
  flex-direction: column;
  padding: 16px;
  &__empty {
    text-align: center;
  }

  &__filled {
    padding: 0 16px;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba($color-text--contrast, 0.2);
    margin: 16px 0;
    padding-top: 16px;
  }
  &__total-sum {
    /* padding-right: 16px * 2.5; */
  }
}
</style>
