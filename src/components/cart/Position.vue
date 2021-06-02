<template>
  <div class="position">
    <div class="position__title" :title="title">
      {{ title }}
    </div>
    <div class="position__status">
      <button
        class="position__button"
        :class="{ 'position__button--contrast': isContrast }"
        @click="changeAmount({ cartProductId: position.cartProductId, modifier: -1 })"
      >
        –
      </button>
      <span class="position__amount">{{ position.amount }}</span>
      <button
        class="position__button"
        :class="{ 'position__button--contrast': isContrast }"
        @click="changeAmount({ cartProductId: position.cartProductId, modifier: 1 })"
      >
        +
      </button>
      <span>&times; {{ numberWithSpaces(position.priceDiscount || position.price) }} ₽</span>
    </div>
  </div>
</template>

<script>
import { numberWithSpaces } from '@/utils/index.js';
import { mapActions } from 'vuex';

export default {
  name: 'Position',
  props: {
    position: {
      type: Object,
      required: true,
    },
    isContrast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      const { title, sizeName, optionName } = this.position;
      return ` ${title} ${sizeName} ${optionName}`;
    },
  },
  created() {
    // если текущий
    const { _id, amount, cartProductId } = this.position;
    if (typeof cartProductId === 'undefined') {
      this.changeAmount({ cartProductId: _id, modifier: -amount });
    }
  },
  methods: {
    numberWithSpaces,
    ...mapActions(['changeAmount']),
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.position {
  $block: &;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;

  & + & {
    margin-top: 12px;
  }

  &__title,
  &__status {
    margin: 4px 0;
    display: inline-block;
  }

  &__status {
    margin-left: auto;
  }

  &__amount {
    display: inline-block;
    margin: 0 3px;
  }

  &__button {
    margin: 0;
    padding: 0;
    border: 0;
    width: 20px;
    height: 20px;
    background: $--color-gray-300;
    color: inherit;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: $--color-gray-400;
    }

    &:active {
      background: $--color-gray-500;
    }

    &:focus {
      outline: none;
    }

    &--contrast {
      background: $--color-gray-contrast-300;
      &:hover {
        background: $--color-gray-contrast-400;
      }

      &:active {
        background: $--color-gray-contrast-500;
      }
    }
  }
}
</style>
