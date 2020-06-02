<template>
  <div class="banner">
    <div class="banner__container" :class="'banner__container--' + background" :title="title">
      <img :src="src" :alt="title" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    src: {
      required: false,
      type: String,
      default: null,
    },
    background: {
      required: false,
      type: String,
      default: 'blank',
    },
    title: {
      required: false,
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.banner {
  height: 100%;
  overflow: hidden;

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--default {
      background: $--color-gray-50;
    }

    &--primary {
      background: $--color-primary-400;
    }

    &--contrast {
      background: $--color-gray-900;
    }
  }

  & img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
</style>
