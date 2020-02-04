<template>
  <div class="card">
    <div class="card__preview">
      <div class="card__tags">
        <div v-for="tag in tags" :key="tag" class="card__tag" :class="getTag(tag)">{{ tag }}</div>
      </div>
      <img ref="productImage" :src="product.photo.path" :alt="product.title" @click="zoomImage" />
    </div>
    <div class="card__details">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <p>{{ product.measure }}</p>
      <p>{{ product.calories }} кКал</p>

      <div class="card__action">
        <div class="card__price">{{ price }} ₽</div>
        <base-button class="card__button button--wide" @click="addToCart(product)">
          {{ amount > 0 ? 'в корзине ' + amount : 'в корзину' }}
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { numberWithSpaces } from '@/utils';
import { EventBus } from '@/utils/index.js';

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Card',
  props: {
    product: Object,
  },
  computed: {
    isSimpleProduct() {
      return typeof this.product.versions !== 'object';
    },
    price() {
      return this.isSimpleProduct
        ? numberWithSpaces(this.product.price)
        : numberWithSpaces(this.product.versions[this.product.chosenVersion].price);
    },
    currentProduct() {
      return this.$route.params.productId || 'pizza';
    },
    versionId() {
      return this.product._id + (this.isSimpleProduct ? '' : `_ver${this.product.chosenVersion}`);
    },
    amount() {
      return this.$store.getters.amountInCart(this.versionId);
    },
    tags() {
      return this.product.tags.filter(tag => tag !== '');
    },
  },
  methods: {
    ...mapMutations(['zoomImage']),
    ...mapActions(['addToCart']),
    // actually this is action creator
    setVersion(versionId) {
      if (this.product.chosenVersion !== versionId) {
        this.$store.commit('setVersion', {
          product: this.currentProduct,
          productId: this.product._id,
          versionId,
        });
      }
    },
    getTag(tag) {
      return `card__tag--${tag}`;
    },
    zoomImage() {
      EventBus.$emit('zoom-image', this.$refs.productImage);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.card {
  $block: &;

  display: flex;
  flex-direction: column;
  height: calc(100% - 16px);
  margin-bottom: 16px;
  box-sizing: border-box;

  &__preview {
    position: relative;
    & img {
      border-radius: 2px 2px 0 0;
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  &__details {
    flex-grow: 1;
    padding: 8px 16px;

    h2 {
      margin: 0 0 10px;
      font: normal 32px/1 $font-body;
      font-weight: normal;
    }
    p {
      margin: 0 0 10px;
      color: $color-gray-700;
      font: normal 16px/1.38 $font-body;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  &__price {
    font-size: 32px;
  }

  &__button {
    max-width: 50%;
  }

  &__tags {
    position: absolute;
    top: 16px * -1.25;
    right: 16px * -1.25;
    display: flex;
  }

  &__tag {
    background: $color-background--contrast;
    color: $color-text--contrast;
    font-size: 16px * 0.75;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
    width: 16px * 2.5;
    text-align: center;
    padding: 16px * 0.87 0;
    margin-left: 16px * 0.5;
    border-radius: 50%;

    &--hit {
      background-color: $color-background--contrast;
    }

    &--new {
      background-color: $color-primary;
    }
  }
}
</style>
