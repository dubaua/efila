<template>
  <div class="card">
    <div class="card__preview">
      <div class="card__tags">
        <div v-for="tag in product.tags" v-if="tag" :key="tag" class="card__tag" :class="getTag(tag)">{{ tag }}</div>
      </div>
      <img :src="product.photo.path" :alt="product.title" />
    </div>
    <div class="card__details">
      <div class="card__about">
        <h2 class="card__title">{{ product.title }}</h2>
        <p><span class="muted">СОСТАВ:</span> {{ product.description }}</p>
        <p><span class="muted">ВЕС:</span> {{ product.measure }}</p>
        <p><span class="muted">КАЛОРИИ:</span> {{ product.calories }}</p>
      </div>
      <div class="card__action">
        <div class="card__price">{{ price }},00 руб.</div>
        <base-button class="card__button button--wide" @click="addToCart(product)">
          {{ amount > 0 ? 'есть ' + amount : 'хочу' }}
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { numberWithSpaces } from '@/utils';

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
  },
  methods: {
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
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.card {
  $block: &;

  display: flex;
  flex-direction: column;
  height: calc(100% - #{$base * 2});
  margin-bottom: $base * 2;
  box-sizing: border-box;
  background-color: black;
  color: white;

  h2#{$block}__title {
    
    font-size: 36px;
    
    font-weight: normal;
    margin-bottom: 12px;
    margin-top: 0;
  }

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
    display: flex;
    flex-direction: column;
  }

  &__about {
    margin-top: 16px;
    p {
    // color: #bd9b8e;
      font-size: 20px;
      line-height: 1.35;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }

  &__price {
    font-family: $font--body;
    font-size: 24px;
    .rouble {
      // font-weight: 300;
      font-size: 28px;
      margin-left: 0.2em;
    }
  }

  &__button {
    max-width: 50%;
  }

  &__tags {
    position: absolute;
    top: $base * -1.25;
    right: $base * -1.25;
    display: flex;
  }

  &__tag {
    background: $color-background--contrast;
    color: $color-text--contrast;
    font-size: $base * 0.75;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
    width: $base * 2.5;
    text-align: center;
    padding: $base * 0.87 0;
    margin-left: $base * 0.5;
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
