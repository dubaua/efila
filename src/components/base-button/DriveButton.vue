<template>
  <button class="button drive-button" v-bind="$attrs" v-on="$listeners">
    <div ref="initial" class="drive-button__state">
      <slot name="initial" />
    </div>
    <div ref="active" class="drive-button__state drive-button__state--active">
      <slot name="active" />
    </div>
  </button>
</template>

<script>
import animate from '@/utils/animate.js';
import progressFromTo from '@/utils/progressFromTo.js';
import * as ez from '@/utils/easings.js';

export default {
  name: 'DriveButton',
  props: {
    active: Boolean,
  },
  data() {
    return {
      animation: null,
    };
  },
  watch: {
    active() {
      this.drive();
    },
  },
  mounted() {
    this.drawButton(1);
  },
  methods: {
    drawButton(p) {
      const leaveProgress = -ez.easeInQuint(progressFromTo(p, 0, 0.75));
      const enterTranslateProgress = 1 - ez.easeInCubic(progressFromTo(p, 0.25, 0.8));
      const enterSkewProgress = 1 - ez.easingOutBack(progressFromTo(p, 0.75, 1), 1.6);
      const leaveElement = this.active ? this.$refs.initial : this.$refs.active;
      const enterElement = this.active ? this.$refs.active : this.$refs.initial;
      leaveElement.style.transform = `translate(${leaveProgress * 125}%, 0) skew(${leaveProgress * 45}deg, 0)`;
      enterElement.style.transform = `translate(${enterTranslateProgress * 125}%, 0) skew(${enterSkewProgress *
        -45}deg, 0)`;
    },
    drive() {
      this.animation = animate({
        duration: 618,
        easing: (t) => t,
        draw: this.drawButton,
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.drive-button {
  $block: &;

  overflow: hidden;
  position: relative;

  &__state {
    position: relative;
    transform-origin: left bottom;

    &--active {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 8px 0;
      transform: translateX(100%);
    }
  }
}
</style>
