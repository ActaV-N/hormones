import P5 from 'p5';
import roboto from '../static/font/Roboto/Roboto-Medium.ttf';
import { setXPosition, setYPosition } from '../util/position';
import { colorConfigure } from './configure';
import Particle from './particles';

// P5 var
let stateChange: boolean = false;
export const maxRamble = 500;

const particles: Particle[] = [];
let tps: {
  x: number;
  y: number;
  alpha: number;
}[] = [];
let font: P5.Font;

type textOptionT = {
  x: number | string;
  y: number | string;
  size: number;
  text: string;
};
const textOption: textOptionT = {
  x: 0,
  y: 0,
  size: 0,
  text: '',
};

export const setTextOption = (
  option: textOptionT,
  isCenter: boolean = true,
) => {
  textOption.x = option.x;
  textOption.y = option.y;

  if (isCenter) {
    textOption.x = 'center';
    textOption.y = 'center';
  }

  textOption.size = option.size;
  textOption.text = option.text;
};

export enum mode {
  ramble = 'Ramble',
  text = 'Text',
}

let currentMode: mode = mode.ramble;
export const changeMode = (modeTo: mode) => {
  currentMode = modeTo;
  stateChange = true;
};

const sketcher = (p5: P5) => {
  p5.preload = () => {
    font = p5.loadFont(roboto);
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.class('background-canvas');
    for (let i = 0; i < maxRamble; i++) {
      particles.push(new Particle(p5, i));
    }
  };

  p5.draw = async () => {
    p5.background(colorConfigure.canvasColor);
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(currentMode);
    }
    const gap = Math.abs(tps.length - particles.length);

    for (let i = 0; i < gap; i++) {
      if (tps.length > particles.length) {
        particles.push(new Particle(p5, i + particles.length + 1, true));
      }
    }
    if (tps.length < particles.length && tps.length !== 0) {
      particles.splice(tps.length, gap);
    }

    if (tps.length !== 0 && tps.length === particles.length) {
      particles.sort(() => Math.random() - 0.5);
      for (let i = 0; i < tps.length; i++) {
        if (particles[i]) {
          const target = tps[i] as {
            x: number;
            y: number;
            alpha: number;
          };
          particles[i].setTarget({ x: target.x, y: target.y });
        }
      }

      tps = [];
    }

    if (stateChange) {
      stateChange = false;

      if (currentMode === mode.ramble) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].setTarget();
        }
      } else {
        const bounds = font.textBounds(textOption.text, 0, 0, textOption.size);

        const x = setXPosition(textOption.x as string, p5, bounds);
        const y = setYPosition(textOption.y as string, p5, bounds);

        tps = font.textToPoints(textOption.text, x, y, textOption.size, {
          sampleFactor: 0.5,
        });
      }
    }
  };
};

// P5 functions
export const killParticle = (index: number) => particles.splice(index, 1);

new P5(sketcher);
