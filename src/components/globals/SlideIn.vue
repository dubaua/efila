<template>
  <transition :name="transitionName" @after-leave="dispatchNext">
    <aside
      class="slide-in"
      v-if="isActive"
      v-touch:swipe.top="direction === 'down' &amp;&amp; swipeAction ? onSwipe : null"
      v-touch:swipe.left="direction === 'right' &amp;&amp; swipeAction ? onSwipe : null"
      v-touch:swipe.right="direction === 'left' &amp;&amp; swipeAction ? onSwipe : null"
      v-touch:swipe.bottom="direction === 'up' &amp;&amp; swipeAction ? onSwipe : null"
    >
      <h1 class="slide-in__title" v-if="title">{{ title }}</h1>
      <div class="slide-in__body">
        <slot />
      </div>
    </aside>
  </transition>
</template>

<script>
import { mapActions } from 'vuex';

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
    swipeAction: String,
    title: String,
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 1200;
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

  bottom: 56px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  color: $color-text--contrast;
  background: $color-background--contrast;

  @include from-breakpoint('sm') {
    right: 50%;
  }

  @include from-breakpoint('lg') {
    right: 66.67%;
  }

  &__title {
    margin: 0 $base $base;
    padding: $base 0;
    font-size: $base;
    text-align: center;
  }

  &__body {
    flex-grow: 1;
    max-height: 100%;
    overflow-y: auto;
    padding-bottom: $base;
  }
}
</style>
