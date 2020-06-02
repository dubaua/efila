<template>
  <svg class="icon" :width="width" :height="height" focusable="false">
    <use :xlink:href="xhref" />
  </svg>
</template>

<script>
import './sprite/index.js';

export default {
  name: 'Icon',
  props: {
    glyph: {
      required: true,
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  computed: {
    xhref() {
      return `#${this.glyph}`;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.icon {
  pointer-events: none;
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
