<template>
  <div class="turn-button" :class="{ 'turn-button--active': active }">
    <div class="turn-button__side turn-button__front">
      <slot name="unactive" />
    </div>
    <div class="turn-button__side turn-button__top">
      <slot name="active" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TurnButton',
  props: {
    active: Boolean,
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.turn-button {
  $block: &;

  position: relative;
  perspective: 1400px;
  transform-style: preserve-3d;

  &__side {
    transition: transform $timing;
    transform-origin: 50% 50% $base / -0.9;
    backface-visibility: hidden;

    // & *:focus {
    //   outline: none;
    // }
  }

  &__top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: rotateX(-90deg);
  }

  &--active {
    #{$block} {
      &__front {
        transform: rotateX(90deg);
      }
      &__top {
        transform: rotateX(0);
      }
    }
  }
}
</style>
