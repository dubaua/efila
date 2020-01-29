<template>
  <div class="radio" :class="{ active: value }"></div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: Boolean,
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.radio {
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #ccc;
  border: 12px solid $color-text--contrast;
  background: $color-primary;
  box-sizing: border-box;
  transition: border-width linear;
  transition-duration: $timing-fast;

  &.active {
    border-width: 6px;
  }
}
</style>
