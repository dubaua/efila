<template>
  <div class="order" :class="{ 'order--contrast': isContrast }">
    <form v-if="isOrderAvailable && !isSent" ref="form" class="form" :class="{ 'form--contrast': isContrast }" @submit.prevent="send">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions" />
      <base-button size="wide" :disabled="isSending || isSent">Оформить заказ</base-button>
    </form>
    <div v-if="isSent" class="order__sent">
      <div ref="deliveryVan" class="delivery">
        <span ref="deliveryCabin" class="delivery__word delivery__word--cabin">готовим,</span>
        <span ref="deliveryProduct" class="delivery__word delivery__word--product">и мчим к вам!</span>
      </div>
    </div>
  </div>
</template>

<script>
// TODO disable form while sending
import BaseButton from '@/components/base-button/BaseButton.vue';
import { sendForm } from '@/api/index.js';
import { mapActions, mapMutations } from 'vuex';
import animate from '@/utils/animate.js';
import progressFromTo from '@/utils/progressFromTo.js';
import * as ez from '@/utils/easings.js';

function initFormState() {
  return {
    name: '',
    phone: '',
    needDelivery: false,
    address: '',
    needChange: false,
    changeAmount: '',
    comment: '',
  };
}

export default {
  name: 'Order',
  components: {
    BaseButton,
  },
  props: {
    isContrast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSending: false,
      isSent: false,
      model: initFormState(),
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Имя',
            model: 'name',
            id: 'name',
            placeholder: 'Имя',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Телефон',
            model: 'phone',
            id: 'phone',
            placeholder: 'Телефон',
            required: true,
          },
          {
            type: 'radios',
            label: 'Доставка',
            model: 'needDelivery',
            id: 'needDelivery',
            values: [
              {
                name: 'Самовывоз',
                value: false,
              },
              {
                name: 'Доставка',
                value: true,
              },
            ],
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Адрес',
            model: 'address',
            id: 'address',
            placeholder: 'Адрес',
            required: function(model) {
              return model && model.needDelivery;
            },
            visible: function(model) {
              return model && model.needDelivery;
            },
            validator(value, field, model) {
              if (!model.needDelivery) {
                return true;
              }
              return !!value;
            },
          },
          {
            type: 'radios',
            label: 'Оплата',
            model: 'needChange',
            values: [
              {
                name: 'Оплата картой',
                value: false,
              },
              {
                name: 'Наличными',
                value: true,
              },
            ],
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Сдача с',
            model: 'changeAmount',
            id: 'changeAmount',
            placeholder: 'Сдача с',
            visible: function(model) {
              return model && model.needChange;
            },
            required: function(model) {
              return model && model.needChange;
            },
            validator(value, field, model) {
              if (!model.needChange) {
                return true;
              }
              return !!value;
            },
          },
          {
            type: 'textArea',
            label: 'Комментарий к заказу',
            model: 'comment',
            id: 'comment',
            rows: 4,
            max: 500,
            placeholder: 'Комментарий к заказу',
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },
  computed: {
    isOrderAvailable() {
      return this.$store.getters.totalCost !== 0;
    },
    formData() {
      // first send to email via phpmailer
      const cart = this.$store.state.cart;

      const order = Object.keys(cart)
        .map((key) => cart[key])
        .map(({ amount, productId, categoryId, sizeIndex, optionIndex }) => ({
          amount,
          productId,
          categoryId,
          sizeIndex,
          optionIndex,
        }));

      return {
        ...this.model,
        order,
      };
    },
  },
  methods: {
    ...mapMutations(['clearCart']),
    ...mapActions(['closeCart']),
    clearForm() {
      this.model = initFormState();
    },
    async send() {
      this.isSending = true;

      const { success } = await sendForm({ url: '/order.php', form: this.formData });
      this.isSending = false;

      if (success) {
        this.animateDelivery();
      }
    },
    animateDelivery() {
      this.isSent = true;
      animate({
        duration: 4000,
        easing: (t) => t,
        draw: (p) => {
          const deliveryVanNode = this.$refs.deliveryVan;
          const deliveryProductNode = this.$refs.deliveryProduct;

          const productProgress = progressFromTo(p, 0, 0.13);
          const productTranslateX = (1 - productProgress) * 50;

          const productTranslateYProgress = ez.easeOutCubic(
            productProgress < 0.5 ? productProgress * 2 : 2 - productProgress * 2,
          );
          const productTranslateY = productTranslateYProgress * -38;

          const productRotateProgress = ez.easeOutCubic(1 - productProgress);
          const productRotate = productRotateProgress * 8;

          const transform = `translate(${productTranslateX}vw, ${productTranslateY}%) rotate(${productRotate}deg)`;

          deliveryProductNode.style.transform = transform;

          const vanProgress = ez.easingInCirc(progressFromTo(p, 0.8, 1));

          const vanTranslateX = vanProgress * -100;

          const engineProgress = progressFromTo(p, 0.6, 0.82);
          const vanTranslateY = 0 < engineProgress && engineProgress < 1 ? Math.random() * 2 - 2 : 0;

          const vanSkewX = ez.easeInQuad(progressFromTo(p, 0.7, 0.8)) * -20;

          deliveryVanNode.style.transform = `translate(${vanTranslateX}vw, ${vanTranslateY}px) skew(${vanSkewX}deg, 0)`;
        },
        onComplete: () => {
          this.clearForm();
          this.clearCart();
          this.closeCart();
          this.isSent = false;
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.order {
  &__sent {
    font-size: $--font-size-300;
    font-family: $--font-face-title;
    text-align: center;
  }
}

.delivery {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: $--min-form-height;
  overflow: hidden;
  &__van {
    display: block;
    transform-origin: left bottom;
  }

  &__word {
    display: inline-block;
    font-family: 'Sangha Kali';
    font-size: 34px;
    @include from('xl') {
      font-size: 48px;
    }
    transform-origin: right bottom;

    &--cabin {
      margin-right: 0.3em;
    }
    &--product {
      // transform: translate(100vh, 0);
    }
  }
}
</style>
