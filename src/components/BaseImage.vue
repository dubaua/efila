<template>
  <img :src="baseURL + src" :alt="alt" v-on="$listeners" />
</template>

<script>
import { baseURL } from '../api';

export default {
  name: 'BaseImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  data() {
    return { baseURL };
  },
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
