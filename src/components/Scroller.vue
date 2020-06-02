<template>
  <div>scroller</div>
</template>

<script>
export default {
  name: 'Scroller',
  props: {},
};
import { throttle } from 'throttle-debounce';

const horizontalScrollerSelector = '[data-horizontal-scroller]';
const horizontalScrollerContainerSelector = '[data-horizontal-scroller-container]';
const horizontalScrollerNodeList = document.querySelectorAll(horizontalScrollerSelector);
const atStartClassname = 'horizontal-scroller--start';
const atEndClassname = 'horizontal-scroller--end';

for (let i = 0; i < horizontalScrollerNodeList.length; i++) {
  const horizontalScrollerNode = horizontalScrollerNodeList[i];
  const horizontalScrollerContainerNode = horizontalScrollerNode.querySelector(horizontalScrollerContainerSelector);

  horizontalScrollerContainerNode.addEventListener(
    'scroll',
    throttle(60, () => {
      drawScroll(horizontalScrollerNode, horizontalScrollerContainerNode);
    }),
    { passive: true },
  );

  drawScroll(horizontalScrollerNode, horizontalScrollerContainerNode);
}

function drawScroll(rootNode, containerNode) {
  const { scrollLeft, scrollWidth, offsetWidth } = containerNode;
  const atStart = scrollLeft <= 0;
  const atEnd = scrollLeft >= scrollWidth - offsetWidth;
  if (atStart) {
    rootNode.classList.add(atStartClassname);
  } else {
    rootNode.classList.remove(atStartClassname);
  }
  if (atEnd) {
    rootNode.classList.add(atEndClassname);
  } else {
    rootNode.classList.remove(atEndClassname);
  }
}
</script>

<style lang="scss">

</style>
