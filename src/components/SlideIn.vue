<template>
  <transition :name="transitionName" @after-leave="dispatchNext">
    <aside
      v-if="isActive"
      v-touch:swipe.top="direction === 'down' && swipeAction ? onSwipe : null"
      v-touch:swipe.left="direction === 'right' && swipeAction ? onSwipe : null"
      v-touch:swipe.right="direction === 'left' && swipeAction ? onSwipe : null"
      v-touch:swipe.bottom="direction === 'up' && swipeAction ? onSwipe : null"
      class="slide-in"
    >
      <h1 v-if="title" class="slide-in__title">{{ title }}</h1>
      <div class="slide-in__body">
        <slot />
      </div>
    </aside>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';
import { MOBILE_THRESHOLD } from '@/settings.js';

export default {
  name: 'SlideIn',
  props: {
    direction: {
      requred: true,
      type: String,
      default: 'right',
    },
    isActive: {
      requred: true,
      type: Boolean,
    },
    swipeAction: {
      required: false,
      type: String,
      default: null,
    },
    title: {
      required: false,
      type: String,
      default: null,
    },
  },
  computed: {
    isMobile() {
      return window.innerWidth <= MOBILE_THRESHOLD;
    },
    transitionName() {
      return `slide-${this.direction}`;
    },
  },
  methods: {
    ...mapActions(['dispatchNext']),
    onSwipe() {
      this.$store.dispatch(this.swipeAction);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.slide-in {
  @include fixed-overlay;

  bottom: $--footer-height;
  display: flex;
  flex-direction: column;
  z-index: 10;
  color: $--color-gray-contrast-900;
  background: $--color-gray-contrast-50;

  @include from('sm') {
    right: 50%;
  }

  @include from('lg') {
    right: 66.67%;
  }

  &__title {
    margin: 0 16px 16px;
    padding: 16px 0;
    font-size: $--font-size-300;
    font-family: $--font-face-title;
    text-align: center;
    font-weight: normal;
  }

  &__body {
    flex-grow: 1;
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: 16px;
  }
}
</style>
