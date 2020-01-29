<template>
  <transition name="fade" @after-leave="unfreeze" @before-enter="freeze">
    <div class="overlay" v-if="isOverlayed" @click.self="closeAll"></div>
  </transition>
</template>

<script>
import disableScroll from 'disable-scroll';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Overlay',
  computed: {
    ...mapGetters(['isOverlayed']),
  },
  methods: {
    ...mapActions(['closeAll']),
    freeze() {
      disableScroll.on();
    },
    unfreeze() {
      disableScroll.off();
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.overlay {
  @include fixed-overlay;

  background: rgba($color-background--contrast, 0.85);
  backdrop-filter: blur(5px);
}
</style>
