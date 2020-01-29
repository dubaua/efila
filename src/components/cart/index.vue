<template>
  <div class="cart">
    <div class="cart__empty" v-if="totalAmount === 0">Корзина пока что, пуста ;(</div>
    <div class="cart__filled" v-else>
      <div class="cart__contents">
        <position v-for="position in cart" :key="position.id" :position="position" :isCompact="isCompact"></position>
      </div>
      <div class="cart__total">
        <div class="cart__total-label">Всего</div>
        <div class="cart__total-sum">{{ totalCost }} ₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Order from '@/components/Order';
import Position from './Position';

export default {
  name: 'Cart',
  components: {
    Order,
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
  padding: $base;
  &__empty {
    text-align: center;
  }

  &__filled {
    padding: 0 $base;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba($color-text--contrast, 0.2);
    margin: $base 0;
    padding-top: $base;
  }
  &__total-sum {
    /* padding-right: $base * 2.5; */
  }
}
</style>
