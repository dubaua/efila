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
          label: 'Горячие роллы',
        },
        {
          to: '/hotRolls',
          label: 'Запеченные роллы',
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
          label: 'Контакты и доставка',
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
  &--compact {
    display: flex;
  }
  &__link {
    display: flex;
    align-items: center;
    padding: $base $base * 2;
    font-family: $font--title;
    text-decoration: none;
    letter-spacing: 0.05em;
    color: $color-text--contrast;
    cursor: pointer;
    &.router-link-exact-active {
      color: $color-primary;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        display: block;
        left: 50%;
        transform: translate(-50%, 0);
        top: 100%;
        border-width: 8px 12px 0 12px;
        border-style: solid;
        border-color: $color-background--contrast transparent transparent transparent;
      }
    }

    @include from-breakpoint('xl') {
      padding-bottom: $base * 1.5;
      padding-top: $base * 1.5;
    }
  }
}
</style>
