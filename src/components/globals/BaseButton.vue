<template>
  <button class="button" v-on="$listeners" v-bind="$attrs" :class="className">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    size: String,
  },
  computed: {
    className() {
      return this.size ? `button--${this.size}` : '';
    },
  },
};
</script>

<style src="./BaseButton.scss" lang="scss"></style>
