<template>
  <div class="console">
    <div class="console__notch">
      <div class="console__handle" :style="handleStyle" />
      <label
        v-for="(option, index) in options"
        :key="index"
        class="console__option"
        :class="{ 'console__option--active': activeIndex === index }"
        :for="'console-' + _uid + '-' + index"
      >
        <input
          :id="'console-' + _uid + '-' + index"
          type="radio"
          :name="'console-' + _uid"
          class="console__input"
          :checked="activeIndex === index"
          @change="onChange(index)"
        />
        {{ option[labelKey] }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Console',
  props: {
    options: {
      type: Array,
      required: true,
    },
    labelKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    handleStyle() {
      const count = this.options.length;
      const active = this.activeIndex;
      return {
        width: `${100 / count}%`,
        left: `${(active / count) * 100}%`,
      };
    },
  },
  methods: {
    onChange(index) {
      this.$emit('change', index);
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/_globals.scss';

.console {
  $console: &;
  padding: 3px;
  overflow: hidden;
  border-radius: 8px;
  background: $--color-gray-contrast-50;

  &__notch {
    position: relative;
    display: flex;
  }

  &__handle {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: 5px;
    background: $--color-gray-contrast-75;
    box-shadow: rgba(0, 0, 0, 0.38) 0px 24px 30px 12px;
    transition-property: left;
    transition-duration: 160ms;
    transition-timing-function: $--timing-in-out-cubic;
  }

  &__option {
    position: relative;
    display: block;
    width: 100%;
    padding: 4px 0;
    font-size: $--font-size-75;
    color: $--color-gray-contrast-600;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $--color-gray-contrast-700;
    }
    &--active {
      color: $--color-gray-contrast-900;
      cursor: default;
      &:hover {
        color: $--color-gray-contrast-900;
      }
    }
  }

  &__input {
    width: 0;
    height: 0;
    line-height: 0;
    overflow: hidden;
    display: block;
  }
}
</style>
