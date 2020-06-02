<template>
  <div class="menu">
    <template v-for="link in items">
      <router-link :key="link.typeId" class="menu__link" :to="getLink(link)" @click.native="closeMenu">
        {{ link.title }}
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(['closeMenu']),
    getLink({ type, typeId }) {
      if (type === 'singleton') {
        return `/pages/${typeId}`;
      } else {
        return `/${typeId}`;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.menu {
  background: $--color-gray-contrast-50;

  @include from('xl') {
    display: flex;
  }

  &__link {
    display: block;
    padding: 12px 16px;
    font-family: $--font-face-title;
    font-size: $--font-size-200;
    line-height: 24px;
    @include from('xl') {
      padding: 16px;
      letter-spacing: -0.03em;
    }
    @include from('xxl') {
      letter-spacing: 0;
    }
    text-decoration: none;
    color: $--color-gray-contrast-900;
    cursor: pointer;
    transition-property: background, color;
    transition-timing-function: $--timing-in-out-cubic, $--timing-in-out-cubic;
    transition-duration: $--duration-200, $--duration-200;

    &.router-link-exact-active {
      background: $--color-gray-contrast-75;
    }

    &:hover {
      background: $--color-gray-contrast-75;
    }

    &:active {
      background: $--color-gray-contrast-100;
    }
  }
}
</style>
