import gsap from 'gsap';

export type colorConfigureType = {
  particleColor?: string;
  canvasColor?: string;
  randomColors?: string[];
};

export type particleConfigureType = {
  defaultSize?: number;
  onTextSize?: number;
};

export let colorConfigure = {
  particleColor: '#f7f7f7',
  canvasColor: '#1e1e1e',
  randomColors: ['#f78e1a', '#1473e6', '#4bc0c0', '#4bc0c0', '#000', '#fff'],
};

export let particleConfigure = {
  defaultSize: 2.5,
  onTextSize: 3,
};

export const smoothChangeColor = (conf: colorConfigureType) => {
  const tl = gsap.timeline();
  tl.set(colorConfigure, {
    particleColor: conf.particleColor,
  });
  tl.to(colorConfigure, {
    canvasColor: conf.canvasColor,
    duration: 0.5,
    ease: 'power1.inOut',
  });
};

export const setParticleConfigure = (conf: particleConfigureType) => {
  particleConfigure = {
    ...particleConfigure,
    ...conf,
  };
};

export const setColorConfigure = (conf: colorConfigureType) => {
  colorConfigure = {
    ...colorConfigure,
    ...conf,
  };
};
