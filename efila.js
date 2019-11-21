import animate from './animate.js';
import progressFromTo from './progressFromTo.js';
import * as ez from './easings.js';

const button = document.getElementById('drive');
const buttonState = button.querySelector('[data-state="initial"]');
const buttonStateActive = button.querySelector('[data-state="active"]');

button.addEventListener('click', function() {
  const isAnimating = Number(button.dataset.isAnimating);
  const nextState = !Number(button.dataset.state);

  if (!isAnimating) {
    button.dataset.isAnimating = 1;
    animate({
      duration:1000,
      easing: t => t,
      draw(p) {
        const leaveProgress = -ez.easeInQuint(progressFromTo(p, 0, 0.75));
        const enterTranslateProgress = 1 - ez.easeInCubic(progressFromTo(p, 0.25, 0.8));
        const enterSkewProgress = 1 - ez.easingBackOut(progressFromTo(p, 0.75, 1), 1.6);
        const leaveElement = nextState ? buttonState : buttonStateActive;
        const enterElement = nextState ? buttonStateActive : buttonState;
        leaveElement.style.transform = `translate(${leaveProgress * 100}%) skewX(${leaveProgress * 45}deg)`;
        enterElement.style.transform = `translate(${enterTranslateProgress * 100}%) skewX(${enterSkewProgress * -45}deg)`;
      },
      onComplete() {
        button.dataset.isAnimating = 0;
        button.dataset.state = Number(nextState);
      },
    });
  }
});
