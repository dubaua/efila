<template>
  <svg class="icon" :width="width" :height="height" focusable="false">
    <use :xlink:href="xhref" />
  </svg>
</template>

<script>
function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./src', true, /\.svg$/));

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
