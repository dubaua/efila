<template>
  <div class="shop-section">
    <div class="container">
      <div class="row">
        <!-- <div class="col col-xs-12 col-xs-order-1 col-lg-4 col-xxl-6">
          <div class="shop-section__about">
            <div class="typography">
              <h1>{{ label }}</h1>
              <div>{{ description }}</div>
            </div>
          </div>
        </div> -->
        <div class="col col-xs-12 col-lg-8 col-lg-order-1 col-xxl-6">
          <div v-if="description.image" class="shop-section__preview">
            <img class="shop-section__image" :src="description.image.path" :alt="description.title" />
          </div>
        </div>
      </div>
      <div class="row">
        <template v-if="entries">
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
import { getCollectionByKey, getCollectionSchemaByKey } from '@/api/index.js';

export default {
  name: 'Product',
  components: {
    Card,
  },
  data() {
    return {
      entries: [],
      total: [],
      label: '',
      description: '',
    };
  },
  created() {
    this.fetchProducts();
    console.log('created');
  },
  methods: {
    getBannerClasses(ordering) {
      if (ordering) {
        return ordering.map(config => `col-${config.breakpoint}-order-${config.order}`).join(' ');
      }
      return '';
    },
    async fetchProducts() {
      const key = this.$route.params.productId || 'rolls';
      const { entries, total } = await getCollectionByKey(key);
      const { description, label } = await getCollectionSchemaByKey(key);
      this.entries = entries;
      this.total = total;
      this.description = description;
      this.label = label;
    },
  },

  // TODO отследить от
  beforeRouteUpdate(to, from, next) {
    this.fetchProducts();
    next();
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.shop-section {
  padding-top: $base * 2;
  &__about {
    padding: $base * 2;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__description {
    p {
      margin: 0;
      line-height: 1.35;
    }
    * + p {
      margin-top: 1em;
    }
  }
  &__preview {
    line-height: 0;
  }
  &__image {
    max-width: 100%;
    height: auto;
  }
}
</style>
