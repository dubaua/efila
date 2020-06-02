<template>
  <div class="call-me-back">
    <form ref="form" class="call-me-back form form--contrast" @submit.prevent="send">
      <h1>Перезвоните мне</h1>
      <vue-form-generator :schema="schema" :model="model" :options="formOptions" />
      <base-button size="wide" :disabled="isSending || isSent">Запросить звонок</base-button>
    </form>
    <div
      v-if="isSent"
      class="call-me-back__sent"
      :class="{
        'call-me-back__sent--positive': success === true,
        'call-me-back__sent--negative': success === false,
      }"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base-button/BaseButton.vue';
import { sendForm } from '@/api/index.js';

function initFormState() {
  return {
    name: '',
    phone: '',
  };
}

export default {
  name: 'CallMeBack',
  components: {
    BaseButton,
  },
  data() {
    return {
      isSending: false,
      isSent: false,
      message: '',
      success: true,
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
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },
  methods: {
    clearForm() {
      this.model = initFormState();
    },
    async send() {
      this.isSending = true;

      const { success, message } = await sendForm({ url: '/callback.php', form: this.model });
      this.isSending = false;

      this.isSent = true;
      this.message = message;
      this.success = success;
      setTimeout(() => {
        this.message = '';
        this.isSent = false;
        this.clearForm();
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.call-me-back {
  margin-top: 2em;
  padding: 0;
  min-height: 0;
  &__sent {
    margin-top: 1em;
    &--positive {
      color: $--color-positive;
    }
    &--negative {
      color: $--color-negative;
    }
  }
}
</style>
