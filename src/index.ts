import './style/index.scss';
import { changeMode, mode, setTextOption } from './p5/sketch';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {
  colorConfigure,
  setColorConfigure,
  smoothChangeColor,
} from './p5/configure';
import BeforeParticle from './animations/beforeParticle';

gsap.registerPlugin(ScrollTrigger);

setColorConfigure({
  canvasColor: '#1e1e1e',
  particleColor: '#f7f7f7',
});

const activeText = (trigger: Element | undefined | null) => {
  if (!trigger?.classList.contains('particle-head')) {
    trigger = trigger?.querySelector('.particle-head');
  }

  const isCenter = trigger?.getAttribute('center') !== null;
  const x = trigger?.getAttribute('x') || 'center';
  const y = trigger?.getAttribute('y') || 'center';

  setTextOption(
    {
      text: `${trigger?.innerHTML}`,
      x: x,
      y: y,
      size: 120,
    },
    isCenter,
  );
  changeMode(mode.text);
};

const changeColor = (
  particleColor: string = '#f7f7f7',
  backgroundColor: string = '#1e1e1e',
) => {
  smoothChangeColor({
    particleColor: particleColor,
    canvasColor: backgroundColor,
  });
};

const particleSections: NodeList =
  document.querySelectorAll('.particle-section');

for (const section of particleSections) {
  const particleColor =
    (section as Element).getAttribute('particle') || ('#f7f7f7' as string);
  const backgroundColor =
    (section as Element).getAttribute('background') || ('#1e1e1e' as string);

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: section as Element,
        start: '10% 40%',
        end: '90% 60%',
        onEnter(e) {
          const trigger = e.trigger;
          activeText(trigger);
          changeColor(particleColor, backgroundColor);
        },
        onEnterBack(e) {
          const trigger = e.trigger;
          activeText(trigger);
          changeColor(particleColor, backgroundColor);
        },
        onLeave() {
          changeMode(mode.ramble);
          changeColor();
        },
        onLeaveBack() {
          changeMode(mode.ramble);
          changeColor();
        },
      },
    })
    .addLabel('start');
}

BeforeParticle();
