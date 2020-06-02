<template>
  <div v-show="isActive" ref="zoomContainer" class="zoom">
    <img ref="zoomImage" class="zoom__image" :src="src" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import createObservable from 'create-observable';
import animate from '@/utils/animate.js';
import { easingOutCirc } from '@/utils/easings.js';

const zoomDuration = 314;

function rotateEasing(p) {
  const state = Math.ceil(p * 3);
  switch (state) {
    case 1:
      return p * 3;
    case 2:
      return 1;
    case 3:
      return 3 - p * 3;
  }
}

export default {
  name: 'Zoom',
  data() {
    return {
      originNode: null,
      delta: {
        x: 0,
        y: 0,
      },
      imageSizes: {
        startWidth: 0,
        endWidth: 0,
      },
      src: '',
      progress: createObservable({ initial: 0, onChange: this.drawImageZoomPopup }),
      animation: null,
      isActive: false,
    };
  },
  computed: {
    zoomedImage() {
      return this.$store.state.page.zoomedImage;
    },
  },
  watch: {
    zoomedImage(zoomImageNode) {
      if (zoomImageNode) {
        this.zoomIn(zoomImageNode);
      } else {
        this.zoomOut();
      }
    },
  },
  mounted() {
    document.addEventListener('keyup', this.keyPressed);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyPressed);
  },
  methods: {
    zoomIn(zoomImageNode) {
      this.originNode = zoomImageNode;

      const { src, naturalWidth } = zoomImageNode;
      const { x: _x, y: _y, left, top, width, height } = zoomImageNode.getBoundingClientRect();
      // x,y doesn't work in IE
      const x = _x || left;
      const y = _y || top;

      this.delta = {
        x: x + width * 0.5 - window.innerWidth * 0.5,
        y: y + height * 0.5 - window.innerHeight * 0.5,
      };

      this.imageSizes = {
        startWidth: width,
        endWidth: naturalWidth,
      };

      this.src = src;

      const startProgress = this.progress.value;
      const deltaProgress = 1 - this.progress.value;

      this.animation = animate({
        duration: zoomDuration,
        easing: (t) => t,
        draw: (p) => {
          this.progress.value = startProgress + p * deltaProgress;
        },
        onComplete: () => {
          this.progress.value = 1;
        },
        onCancel: ({ progress }) => {
          this.progress.value = progress;
        },
      });
    },

    zoomOut() {
      if (this.animation) {
        this.animation.togglePause(true);
      }

      const startProgress = this.progress.value;
      const deltaProgress = 0 - this.progress.value;

      this.animation = animate({
        duration: zoomDuration,
        easing: (t) => t,
        draw: (p) => (this.progress.value = startProgress + p * deltaProgress),
        onComplete: () => {
          this.progress.value = 0;
        },
        onCancel: ({ progress }) => (this.progress.value = progress),
      });
    },

    drawImageZoomPopup(progress) {
      this.isActive = progress > 0;

      const { startWidth, endWidth } = this.imageSizes;

      this.$refs.zoomImage.width = startWidth + Math.ceil((endWidth - startWidth) * progress);

      const { x, y } = this.delta;

      const translateX = (1 - progress) * x;
      const translateY = (1 - progress) * y;

      const rotate = easingOutCirc(rotateEasing(progress)) * 3;

      this.$refs.zoomContainer.style.transform = `translate(${translateX}px,${translateY}px) rotate(${rotate}deg)`;
    },

    keyPressed({ key, code }) {
      const _code = code || key;
      if (_code === 'Escape' && this.animation !== null) {
        this.zoomOut();
      }
    },
  },
};
</script>

<style lang="scss">
.zoom {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  &__image {
    transform: translate(-50%, -50%);
    height: auto;
  }
}
</style>
