<template>
  <div class="menu" :class="{ 'menu--compact': isCompact }">
    <template v-for="link in menu">
      <router-link :key="link.to" class="menu__link" :to="link.to" @click.native="closeMenu">
        {{
          link.label
        }}
      </router-link>
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
          label: 'Сеты',
        },
        {
          to: '/philadelphia',
          label: 'Филадельфия',
        },
        {
          to: '/rolls',
          label: 'Холодные роллы',
        },
        {
          to: '/hotRolls',
          label: 'Запеченные роллы',
        },
        {
          to: '/bakedRolls',
          label: 'Горячие роллы',
        },
        {
          to: '/wok',
          label: 'Wok',
        },
        {
          to: '/snacks',
          label: 'Закуски',
        },
        {
          to: '/drinks',
          label: 'Напитки',
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
  background: $color-gray-50;

  &--compact {
    display: flex;
  }

  &__link {
    padding: 16px 16px;
    font-size: 24px;
    text-decoration: none;
    color: $color-gray-900;
    cursor: pointer;
 
    &:hover {
      text-decoration: underline;
      background: $color-gray-75;
    }

    &.router-link-exact-active {
      color: $color-primary;
      position: relative;
    }

    @include from-breakpoint('xl') {
      padding-bottom: 16px * 1.5;
      padding-top: 16px * 1.5;
    }
  }
}
</style>
