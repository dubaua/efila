<template>
  <div class="cart-status" :class="{ 'cart-status--empty': totalAmount === 0 }">
    <base-button class="cart-status__button" size="wide" :disabled="totalAmount === 0" @click="onClick">
      {{ cartLabel }}
    </base-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/base-button/BaseButton.vue';

export default {
  name: 'Status',
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters(['totalAmount', 'totalCost']),
    cartLabel() {
      return this.totalAmount === 0 ? 'Корзина пуста' : 'Корзина';
    },
  },
  methods: {
    ...mapActions(['toggleCart']),
    onClick() {
      if (this.totalAmount > 0) {
        this.toggleCart();
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.cart-status {
  margin-top: auto;
  padding: 8px 24px 16px;
  text-align: center;
}
</style>
