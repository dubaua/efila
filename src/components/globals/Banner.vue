<template>
  <div class="banner">
    <div class="banner__container" :class="'banner__container--' + background"><img :src="src" /></div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    src: String,
    background: String,
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.banner {
  height: calc(100% - #{16px * 2});
  box-sizing: border-box;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba($color-shade, 0.08);

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--blank {
      background: $color-background;
    }

    &--primary {
      background: $color-primary;
    }

    &--background {
      background: $color-background--contrast;
    }
  }

  & img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
</style>
