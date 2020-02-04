import animate from './animate.js';
import progressFromTo from './progressFromTo.js';
import * as ez from './easings.js';
import createObservable from 'create-observable';

const button = document.getElementById('drive');
const buttonState = button.querySelector('[data-state="initial"]');
const buttonStateActive = button.querySelector('[data-state="active"]');

button.addEventListener('click', () => {
  const isAnimating = Number(button.dataset.isAnimating);
  const nextState = !Number(button.dataset.state);

  if (!isAnimating) {
    button.dataset.isAnimating = 1;
    animate({
      duration: 618,
      easing: t => t,
      draw(p) {
        const leaveProgress = -ez.easeInQuint(progressFromTo(p, 0, 0.75));
        const enterTranslateProgress = 1 - ez.easeInCubic(progressFromTo(p, 0.25, 0.8));
        const enterSkewProgress = 1 - ez.easingOutBack(progressFromTo(p, 0.75, 1), 1.6);
        const leaveElement = nextState ? buttonState : buttonStateActive;
        const enterElement = nextState ? buttonStateActive : buttonState;
        leaveElement.style.transform = `translate(${leaveProgress * 100}%, 0) skew(${leaveProgress * 45}deg, 0)`;
        enterElement.style.transform = `translate(${enterTranslateProgress * 100}%, 0) skew(${enterSkewProgress *
          -45}deg, 0)`;
      },
      onComplete() {
        button.dataset.isAnimating = 0;
        button.dataset.state = Number(nextState);
      },
    });
  }
});

const zoomImageNodeList = document.querySelectorAll('[data-image-preview]');
for (let i = 0; i < zoomImageNodeList.length; i++) {
  const zoomImageNode = zoomImageNodeList[i];
  zoomImageNode.addEventListener('click', () => {
    zoomIn(zoomImageNode);
  });
}

const ZOOM_IMAGE_GLOBAL_KEY = '__zoomImageCloneNode__';
const ZOOM_OVERLAY_CLASSNAME = 'zoom-overlay';
const ZOOM_OVERLAY_CLASSNAME_DISABLED = 'zoom-overlay--disabled';
const ZOOM_CONTAINER_CLASSNAME = 'zoom-container';
const ZOOM_CONTAINER_CLASSNAME_DISABLED = 'zoom-container--disabled';

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

function drawImageZoomPopup(p) {
  window[ZOOM_IMAGE_GLOBAL_KEY].overlayNode.style.opacity = String(p);

  if (p === 0) {
    window[ZOOM_IMAGE_GLOBAL_KEY].overlayNode.classList.add(ZOOM_OVERLAY_CLASSNAME_DISABLED);
    window[ZOOM_IMAGE_GLOBAL_KEY].imageContainerNode.classList.add(ZOOM_CONTAINER_CLASSNAME_DISABLED);
  } else {
    window[ZOOM_IMAGE_GLOBAL_KEY].overlayNode.classList.remove(ZOOM_OVERLAY_CLASSNAME_DISABLED);
    window[ZOOM_IMAGE_GLOBAL_KEY].imageContainerNode.classList.remove(ZOOM_CONTAINER_CLASSNAME_DISABLED);
  }

  const { startWidth, endWidth } = window[ZOOM_IMAGE_GLOBAL_KEY].imageSizes;

  window[ZOOM_IMAGE_GLOBAL_KEY].imageCloneNode.width = startWidth + Math.ceil((endWidth - startWidth) * p);

  const { x, y } = window[ZOOM_IMAGE_GLOBAL_KEY].delta;

  const translateX = (1 - p) * x;
  const translateY = (1 - p) * y;

  const rotate = ez.easingOutCirc(rotateEasing(p)) * 3;

  window[
    ZOOM_IMAGE_GLOBAL_KEY
  ].imageContainerNode.style.transform = `translate(${translateX}px,${translateY}px) rotate(${rotate}deg)`;
}

function zoomIn(zoomImageNode) {
  if (!Object.prototype.hasOwnProperty.call(window, ZOOM_IMAGE_GLOBAL_KEY)) {
    const overlayNode = document.createElement('div');
    overlayNode.classList.add(ZOOM_OVERLAY_CLASSNAME);
    document.body.appendChild(overlayNode);

    overlayNode.addEventListener('click', () => {
      zoomOut(zoomImageNode);
    });

    const imageContainerNode = document.createElement('div');
    imageContainerNode.classList.add(ZOOM_CONTAINER_CLASSNAME);
    document.body.appendChild(imageContainerNode);

    const imageCloneNode = document.createElement('img');
    imageContainerNode.appendChild(imageCloneNode);

    window[ZOOM_IMAGE_GLOBAL_KEY] = {
      overlayNode,
      imageContainerNode,
      imageCloneNode,
      progress: createObservable({ initial: 0, onChange: drawImageZoomPopup }),
    };
  }

  const { src, naturalWidth, naturalHeight } = zoomImageNode;
  const { x: _x, y: _y, left, top, width, height } = zoomImageNode.getBoundingClientRect();
  // x,y doesn't work in IE
  const x = _x || left;
  const y = _y || top;

  window[ZOOM_IMAGE_GLOBAL_KEY].delta = {
    x: x + width * 0.5 - window.innerWidth * 0.5,
    y: y + height * 0.5 - window.innerHeight * 0.5,
  };

  window[ZOOM_IMAGE_GLOBAL_KEY].imageSizes = {
    startWidth: width,
    endWidth: naturalWidth,
  };

  window[ZOOM_IMAGE_GLOBAL_KEY].imageCloneNode.src = src;

  const startProgress = window[ZOOM_IMAGE_GLOBAL_KEY].progress.value;
  const deltaProgress = 1 - window[ZOOM_IMAGE_GLOBAL_KEY].progress.value;
  window[ZOOM_IMAGE_GLOBAL_KEY].animation = animate({
    duration: 314,
    easing: t => t,
    draw(p) {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = startProgress + p * deltaProgress;
    },
    onComplete() {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = 1;
    },
    onCancel({ progress, fraction }) {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = progress;
    },
  });
}

function zoomOut(zoomImageNode) {
  window[ZOOM_IMAGE_GLOBAL_KEY].animation.togglePause(true);

  const startProgress = window[ZOOM_IMAGE_GLOBAL_KEY].progress.value;
  const deltaProgress = 0 - window[ZOOM_IMAGE_GLOBAL_KEY].progress.value;

  window[ZOOM_IMAGE_GLOBAL_KEY].animation = animate({
    duration: 314,
    easing: t => t,
    draw(p) {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = startProgress + p * deltaProgress;
    },
    onComplete() {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = 0;
    },
    onCancel({ progress, fraction }) {
      window[ZOOM_IMAGE_GLOBAL_KEY].progress.value = progress;
    },
  });
}

const successNode = document.querySelector('[data-success]');
const deliveryVanNode = document.querySelector('[data-delivery-van]');
const deliveryCabinNode = document.querySelector('[data-delivery-cabin]');
const deliveryProductNode = document.querySelector('[data-delivery-product]');

successNode.addEventListener('click', () => {
  lel();
});

function lel() {
  animate({
    duration: 2500,
    easing: t => t,
    draw(p) {
      const productProgress = progressFromTo(p, 0, 0.15);
      const productTranslateX = (1 - productProgress) * 50;

      const productTranslateYProgress = ez.easeOutCubic(
        productProgress < 0.5 ? productProgress * 2 : 2 - productProgress * 2,
      );
      const productTranslateY = productTranslateYProgress * -38;

      const productRotateProgress = ez.easeOutCubic(1 - productProgress);
      const productRotate = productRotateProgress * 8;

      const transform = `translate(${productTranslateX}vw, ${productTranslateY}%) rotate(${productRotate}deg)`;

      deliveryProductNode.style.transform = transform;

      const vanProgress = ez.easingInCirc(progressFromTo(p, 0.75, 1));

      const vanTranslateX = vanProgress * -100;

      const engineProgress = progressFromTo(p, 0.55, 0.75);
      const vanTranslateY = 0 < engineProgress && engineProgress < 1 ? Math.random() * 2 - 2 : 0;

      const vanSkewX = ez.easeInQuad(progressFromTo(p, 0.66, 0.75)) * -20;

      deliveryVanNode.style.transform = `translate(${vanTranslateX}vw, ${vanTranslateY}px) skew(${vanSkewX}deg, 0)`;
    },
  });
}

setTimeout(() => {
  lel();
}, 3000);
