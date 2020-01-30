<template>
  <div class="menu" :class="{ 'menu--compact': isCompact }">
    <template v-for="link in menu">
      <router-link class="menu__link" :to="link.to" @click.native="closeMenu" :key="link.to">{{
        link.label
      }}</router-link>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navigation',
  props: {
    isCompact: Boolean,
  },
  data() {
    return {
      menu: [
        {
          to: '/',
          label: 'Роллы',
        },
        {
          to: '/bakedRolls',
          label: 'Горячие',
        },
        {
          to: '/hotRolls',
          label: 'Запеченные',
        },
        {
          to: '/philadelphia',
          label: 'Филадельфия',
        },
        {
          to: '/sets',
          label: 'Сеты',
        },
        {
          to: '/wok',
          label: 'Вок',
        },
        {
          to: '/drinks',
          label: 'Напитки',
        },
        {
          to: '/snacks',
          label: 'Закуски',
        },

        {
          to: '/contact-and-delivery',
          label: 'Контакты',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['closeMenu']),
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.menu {
  background: $color-background--contrast;
  color: $color-text--contrast;

  &--compact {
    display: flex;
  }
  &__link {
    padding: $base $base;
    font-size: 28px;
    text-decoration: none;
    text-transform: lowercase;
    color: $color-text--contrast;
    cursor: pointer;
    &.router-link-exact-active {
      color: $color-primary;
      position: relative;
    }

    @include from-breakpoint('xl') {
      padding-bottom: $base * 1.5;
      padding-top: $base * 1.5;
    }
  }
}
</style>
