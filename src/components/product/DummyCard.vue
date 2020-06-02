<template>
  <div class="dummy-card">
    <div class="dummy-card__image loading-background" />
    <div class="dummy-card__details">
      <div class="dummy-card__title loading-background" />
      <div class="dummy-card__description dummy-card__description--1 loading-background" />
      <div class="dummy-card__description dummy-card__description--2 loading-background" />
      <div class="dummy-card__description dummy-card__description--3 loading-background" />
      <div class="dummy-card__description dummy-card__description--4 loading-background" />
      <div class="dummy-card__description dummy-card__description--5 loading-background" />
      <div class="dummy-card__description dummy-card__description--6 loading-background" />
      <div class="dummy-card__button loading-background" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DummyCard',
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.dummy-card {
  $block: &;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: calc(100% - 20px);
  margin: 0 0 20px;

  &__image {
    padding-bottom: 75%;
    margin-right: 2px;
  }

  &__details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }

  &__title {
    margin: 8px 0 22px;
    height: $--font-size-300 * 0.6;
  }

  &__description {
    margin: 0 0 12px;
    height: $--font-size-100 * 0.6;

    &--1 {
      width: 95%;
    }
    &--2 {
      width: 85%;
    }
    &--3 {
      width: 67%;
    }
    &--4 {
      width: 88%;
    }
    &--5 {
      width: 95%;
    }
    &--6 {
      width: 38%;
    }
  }

  &__button {
    margin: auto 0 0 auto;
    width: 62%;
    height: 42px;
    border-radius: 21px;
  }
}
</style>
