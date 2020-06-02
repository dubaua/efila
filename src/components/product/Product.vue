<template>
  <div class="product">
    <div v-if="isLoading" class="container">
      <div class="row">
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
        <div class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"><dummy-card /></div>
      </div>
    </div>
    <div v-else-if="products.length !== 0" class="container">
      <div class="row">
        <div
          v-for="(card, id, index) in products"
          :key="index"
          class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"
          :style="'order: ' + index"
        >
          <card :product="card" />
        </div>
        <div
          v-for="(banner, index) in banners"
          :key="index"
          class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"
          :class="getBannerClasses(index)"
        >
          <banner :src="banner.image.path" :background="banner.background" :title="banner.title" />
        </div>
      </div>
    </div>
    <div v-else class="product__no-items">
      <icon class="product__no-items-icon" glyph="fork" :width="128" :height="128" />
      <div class="product__no-items-text">Здесь пока нет товаров</div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import Card from './Card.vue';
import DummyCard from './DummyCard.vue';
import Icon from '@/components/icon/Icon.vue';
import { getCollectionByKey } from '@/api/index.js';
import { DEFAULT_PRODUCT_ID } from '@/settings.js';

export default {
  name: 'Product',
  components: {
    Banner,
    Card,
    DummyCard,
    Icon,
  },
  data() {
    return {
      products: [],
      banners: [],
      isLoading: true,
    };
  },
  watch: {
    $route() {
      this.fetchProductsAndBanners();
    },
  },
  created() {
    this.fetchProductsAndBanners();
  },
  methods: {
    getBannerClasses(/* index */) {
      return null;
      // if (index) {
      //   return ordering.map((config) => `col-${config.breakpoint}-order-${config.order}`).join(' ');
      // }
      // return '';
    },
    async fetchProductsAndBanners() {
      this.isLoading = true;

      this.products = [];
      this.banners = [];

      const productKey = this.$route.params.productId || DEFAULT_PRODUCT_ID;
      const [productsResult, bannersResult] = await Promise.all([
        getCollectionByKey({
          key: productKey,
          filter: {
            published: true,
          },
        }),
        getCollectionByKey({
          key: 'banners',
          filter: {
            published: true,
          },
        }),
      ]);

      this.products = productsResult;
      this.banners = bannersResult;

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.product {
  min-height: 100vh;
  position: relative;

  &__no-items {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    color: $--color-gray-contrast-400;
  }

  &__no-items-icon {
    margin-top: 20vh;
    fill: currentColor;
  }

  &__no-items-text {
    margin-top: 16px;
    font-family: $--font-face-title;
    font-size: $--font-size-300;
    text-align: center;
  }
}
</style>
