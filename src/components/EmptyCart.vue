<template>
  <div v-if="isEmpty" class="empty-cart">
    <icon class="empty-cart__icon" glyph="shopping-bag-big" :width="144" :height="144" />
    <div class="empty-cart__text">Корзина пуста</div>
  </div>
</template>

<script>
import Icon from '@/components/icon/Icon.vue';

export default {
  name: 'EmptyCart',
  components: {
    Icon,
  },
  computed: {
    isEmpty() {
      return this.$store.getters.totalAmount === 0;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.empty-cart {
  padding: 12px 0;
  color: $--color-gray-contrast-400;
  &__icon {
    margin: auto;
    fill: currentColor;
  }
  &__text {
    margin-top: 12px;
    text-align: center;
    font-size: $--font-size-200;
  }
}
</style>
