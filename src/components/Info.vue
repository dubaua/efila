<template>
  <div class="info" v-html="info" />
</template>

<script>
import { getSingletonByKey } from '@/api/index.js';

export default {
  name: 'Info',
  data() {
    return {
      info: null,
    };
  },
  async created() {
    const { content } = await getSingletonByKey('info');
    this.info = content;
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';
.info {
  padding: 16px;

  @include from-breakpoint('lg') {
    background: none;
  }

  p {
    text-align: center;
    margin: 0 0 16px;

    a {
      color: inherit;
    }
  }
}
</style>
