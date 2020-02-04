<template>
  <router-link class="logo" to="/">
    <icon glyph="logo" :width="240" :height="240" />
  </router-link>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss">
.logo {
  margin-top: 10px;
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
