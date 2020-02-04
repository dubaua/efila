<template>
  <div class="shop-section">
    <div v-if="isLoading">Загрузка...</div>
    <div class="container" v-else>
      <div class="row">
        <template v-if="entries.length">
          <div
            v-for="(card, id, index) in entries"
            :key="index"
            class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"
            :style="'order: ' + index"
          >
            <card :product="card" />
          </div>
          <!-- <div
            v-for="(banner, index) in banners"
            :key="index"
            class="col col-xs-12 col-sm-6 col-lg-4 col-xxl-3"
            :class="getBannerClasses(banner.ordering)"
          >
            <banner :src="banner.image.path" :background="banner.background" />
          </div> -->
        </template>
        <div v-else class="col col-xs-12">Нет товаров</div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import { getCollectionByKey } from '@/api/index.js';
import { DEFAULT_PRODUCT_ID } from '@/settings.js';

export default {
  name: 'Product',
  components: {
    Card,
  },
  data() {
    return {
      entries: [],
      total: 0,
      isLoading: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    // getBannerClasses(ordering) {
    //   if (ordering) {
    //     return ordering.map(config => `col-${config.breakpoint}-order-${config.order}`).join(' ');
    //   }
    //   return '';
    // },
    async fetchProducts() {
      this.entries = [];
      this.total = 0;
      this.isLoading = true;

      const key = this.$route.params.productId || DEFAULT_PRODUCT_ID;
      const { entries, total } = await getCollectionByKey(key);
      this.entries = entries;
      this.total = total;
      this.isLoading = false;
    },
  },
  watch: {
    $route: 'fetchProducts',
  },
};
</script>
