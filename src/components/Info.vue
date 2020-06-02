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
  padding: 12px 24px;

  @include from('lg') {
    background: none;
  }

  & > * {
    margin: 0;
  }

  & > * + * {
    margin-top: 1em;
  }

  a {
    color: inherit;
  }
}
</style>
