<template>
  <div class="card">
    <div class="card__preview">
      <img ref="productImage" class="card__zoom" :src="baseURL + photoUrl" :alt="product.title" @click="zoomImage" />
    </div>
    <div class="card__details">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <div class="card__options">
        <console v-if="isSizeSwitchable" :options="product.sizes" label-key="sizeName" @change="setSizeIndex" />
        <p v-else>{{ chosenSize.sizeName }}</p>
      </div>
      <div v-if="chosenSize.options" class="card__options">
        <console
          v-if="isOptionsSwitchable"
          :options="chosenSize.options"
          label-key="optionName"
          @change="setOptionIndex"
        />
        <p v-else>{{ chosenSize.options[optionIndex].optionName }}</p>
      </div>
      <div class="card__action">
        <div class="card__price">
          <div class="card__price-value" :class="{'card__price-value--old' : priceDiscount}">{{ numberWithSpaces(price) }} ₽</div>
          <div v-if="priceDiscount" class="card__price-value">{{ numberWithSpaces(priceDiscount) }} ₽</div>
        </div>

        <drive-button class="card__button button--wide" :active="amount > 0" @click="handleAddToCard(product)">
          <template #initial>
            Добавить
          </template>
          <template #active>
            {{ `В корзине ${amount}` }}
          </template>
        </drive-button>
      </div>
    </div>
  </div>
</template>

<script>
import Console from '@/components/Console.vue';
import DriveButton from '@/components/base-button/DriveButton.vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import { numberWithSpaces } from '@/utils/index.js';
import { DEFAULT_PRODUCT_ID } from '@/settings.js';
import { baseURL } from '@/api/index.js';

export default {
  name: 'Card',
  components: {
    Console,
    DriveButton,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseURL,
      sizeIndex: 0,
      optionIndex: 0,
    };
  },
  computed: {
    ...mapState(['page']),
    photoUrl() {
      return this.chosenSize.photo ? this.chosenSize.photo.path : '';
    },
    chosenSize() {
      return this.product.sizes[this.sizeIndex];
    },
    isSizeSwitchable() {
      return this.product.sizes.length > 1;
    },
    isOptionsSwitchable() {
      return this.chosenSize.options.length > 1;
    },
    cartProductId() {
      const optionSuffix = this.chosenSize.options ? `-${this.optionIndex}` : '';
      return `${this.product.categoryId}-${this.product._id}-${this.sizeIndex}${optionSuffix}`;
    },
    amount() {
      return this.$store.getters.getAmountInCardById(this.cartProductId);
    },
    price() {
      const extraCharge = this.chosenSize.options ? this.chosenSize.options[this.optionIndex].extraCharge : 0;
      return this.chosenSize.price + extraCharge;
    },
    priceDiscount() {
      if (!this.chosenSize.priceDiscount) {
        return;
      }

      const extraCharge = this.chosenSize.options ? this.chosenSize.options[this.optionIndex].extraCharge : 0;
      return this.chosenSize.priceDiscount + extraCharge;
    },
  },
  methods: {
    ...mapActions(['addToCart']),
    ...mapMutations(['setZoomedImage']),
    numberWithSpaces,
    zoomImage() {
      if (!this.page.isMobile) {
        this.setZoomedImage(this.$refs.productImage);
      }
    },
    getTagClassName(tag) {
      return `card__tag--${tag}`;
    },
    setSizeIndex(sizeIndex) {
      this.sizeIndex = sizeIndex;
    },
    setOptionIndex(optionIndex) {
      this.optionIndex = optionIndex;
    },
    handleAddToCard(product) {
      const { _id, categoryId, title } = product;
      const {
        cartProductId,
        sizeIndex,
        optionIndex,
        price,
        priceDiscount,
        chosenSize: { sizeName, options },
      } = this;
      const optionName = options ? options[optionIndex].optionName : '';
      this.addToCart({
        cartProductId,
        productId: _id,
        categoryId,
        sizeIndex,
        optionIndex,
        title,
        price,
        priceDiscount,
        sizeName,
        optionName,
      });
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
  box-sizing: border-box;
  height: calc(100% - 20px);
  margin: 0 0 20px;

  &__preview {
    position: relative;
    & img {
      border-radius: 2px 2px 0 0;
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  &__zoom {
    cursor: zoom-in;
  }

  &__details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;

    h2 {
      margin: 0 0 10px;
      font-family: $--font-face-title;
      font-size: $--font-size-300;
      line-height: 1.2;
      font-weight: normal;
    }
    p {
      margin: 0 0 10px;
      color: $--color-gray-contrast-700;
      font: normal 16px/1.38 $--font-face-body;
    }
  }

  &__options {
    margin-bottom: 16px;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    min-height: 50px;
  }

  &__price {
    font-size: $--font-size-300;
    max-width: 38%;
  }

  &__price-value--old {
    font-size: $--font-size-100;
    opacity: 0.45;
    text-decoration: line-through;
  }

  &__button {
    max-width: 62%;
  }

  &__tag {
    background: $--color-gray-50;
    color: $--color-gray-900;
    font-size: $--font-size-50;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: bold;
    width: 16px * 2.5;
    text-align: center;
    padding: 16px * 0.87 0;
    margin-left: 16px * 0.5;
    border-radius: 50%;

    &--hit {
      background-color: $--color-gray-50;
    }

    &--new {
      background-color: $--color-primary-400;
    }
  }
}
</style>
