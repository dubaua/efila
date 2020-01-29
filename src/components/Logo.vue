<template>
  <router-link class="logo" to="/">
    <icon glyph="logo--parts" :width="180" :height="180" />
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
  .icon {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
