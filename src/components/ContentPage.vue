<template>
  <div class="content-page">
    <template v-if="ymapURL">
      <div class="content-page__article content-page__article--compact">
        <div class="typography" v-html="content" />
        <call-me-back v-if="showCallbackForm" />
      </div>
      <div class="content-page__map">
        <iframe :src="sanitizedYMapURL" frameborder="0" class="content-page__map-iframe" />
      </div>
    </template>
    <div v-else class="content-page__article">
      <div class="typography" v-html="content" />
      <call-me-back v-if="showCallbackForm" />
    </div>
  </div>
</template>

<script>
import { getSingletonByKey } from '@/api/index.js';
import CallMeBack from '@/components/CallMeBack.vue';

export default {
  name: 'ContentPage',
  components: {
    CallMeBack,
  },
  data() {
    return {
      content: null,
      ymapURL: null,
      showCallbackForm: null,
    };
  },
  computed: {
    sanitizedYMapURL() {
      if (/^<iframe/.test(this.ymapURL)) {
        const cutBefore = this.ymapURL.replace('<iframe src="', '');
        const cutAfter = cutBefore.substring(0, cutBefore.indexOf('"'));
        return cutAfter;
      }
      return this.ymapURL;
    },
  },
  watch: {
    $route() {
      this.fetchContent();
    },
  },
  created() {
    this.fetchContent();
  },
  methods: {
    async fetchContent() {
      const key = this.$route.params.pageId;
      const { content, ymapURL, showCallbackForm } = await getSingletonByKey(key);
      this.content = content;
      this.ymapURL = ymapURL || null;
      this.showCallbackForm = showCallbackForm || null;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';
.content-page {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - #{$--footer-height});
  @include from('xl') {
    min-height: calc(100vh - #{$--header-height});
  }
  display: flex;
  flex-wrap: wrap;

  &__map {
    position: relative;
    @media (orientation: landscape) {
      width: 50%;
      height: calc(100vh - #{$--footer-height});
      @include from('xl') {
        width: 62%;
      }
    }
    @media (orientation: portrait) {
      width: 100vw;
      height: calc(50vh - #{$--footer-height * 0.5});
      position: sticky;
      top: 0;
    }
  }

  &__map-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__article {
    padding: 16px 16px * 2;
    box-sizing: border-box;
    a {
      color: inherit;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    &--compact {
      @media (orientation: landscape) {
        width: 50%;
        min-height: calc(100vh - #{$--footer-height});
        height: 100%;
        @include from('xl') {
          width: 38%;
        }
      }
      @media (orientation: portrait) {
        width: 100vw;
        min-height: calc(50vh - #{$--footer-height * 0.5});
      }
    }
  }
}
</style>
