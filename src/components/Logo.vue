<template>
  <router-link class="logo" to="/">
    <icon glyph="logo" :width="240" :height="240" />
  </router-link>
</template>

<script>
import Icon from '@/components/icon/Icon.vue';

export default {
  name: 'Logo',
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.logo {
  display: inline-block;
  line-height: 0;
  text-align: center;
  color: inherit;
  .icon {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
