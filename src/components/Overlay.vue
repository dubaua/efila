<template>
  <transition name="fade" @leave="onLeave" @enter="onEnter">
    <div v-if="isOverlayed" class="overlay" @click.self="onOverlayClick">
      <icon class="overlay__icon" glyph="cross" :width="48" :height="48" />
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/icon/Icon.vue';
import { mapActions, mapGetters } from 'vuex';
import { disableDocumentScroll, enableDocumentScroll } from '@/utils/documentScroll.js';

export default {
  name: 'Overlay',
  components: {
    Icon,
  },
  computed: {
    ...mapGetters(['isOverlayed']),
  },
  methods: {
    onLeave() {
      enableDocumentScroll();
    },
    onEnter() {
      disableDocumentScroll();
    },
    onOverlayClick() {
      this.$store.dispatch('closeAll');
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.overlay {
  $overlay: &;

  @include fixed-overlay;

  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  cursor: pointer;
  &__icon {
    display: none;
    @include from('xl') {
      display: block;
      position: absolute;
      right: 16px;
      top: 16px;
      fill: $--color-gray-700;
      transition: color $timing-fast linear;

    }
  }

  &:hover #{$overlay}__icon {
    fill: $--color-gray-400;
  }
}
</style>
