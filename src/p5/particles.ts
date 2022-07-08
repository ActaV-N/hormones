import gsap from 'gsap';
import P5 from 'p5';
import { colorConfigure, particleConfigure } from './configure';
import { killParticle, maxRamble, mode } from './sketch';

const DELAY_ACC = 0.0001;

export default class Particle {
  private p5: P5;

  // Position attr
  public x: number;
  public y: number;
  private init?: {
    x: number;
    y: number;
  };
  private to: {
    x: number;
    y: number;
  } = {
    x: -1,
    y: -1,
  };

  // Radius
  private radius: number;

  // Vel
  private vx: number;
  private vy: number;

  // variable for sensoring change
  private isChanged: boolean;

  // Color
  private fillColor: string;

  private justMove: boolean = false;

  constructor(
    p5: P5,
    private index: number,
    private initialAnimation: boolean = false,
  ) {
    this.p5 = p5;
    this.x = Math.random() * p5.windowWidth;
    this.y = Math.random() * p5.windowHeight;

    this.init = {
      x: this.x,
      y: this.y,
    };

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;

    this.fillColor =
      colorConfigure.randomColors[
        Math.round(Math.random() * (colorConfigure.randomColors.length - 1))
      ];
    this.radius = this.initialAnimation ? 0 : particleConfigure.defaultSize;
    this.isChanged = false;
  }

  ramble() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.p5.windowWidth || this.x < 0) {
      this.vx *= -1;
    }
    if (this.y > this.p5.windowHeight || this.y < 0) {
      this.vy *= -1;
    }
  }

  setTarget(to?: { x: number; y: number }) {
    if (!to) {
      const index = this.index;
      const tl = gsap.timeline().addLabel('setting');

      tl.set(
        this,
        {
          justMove: false,
        },
        'setting',
      ).addLabel('start', '>');

      tl.to(
        this,
        {
          x: this.init?.x,
          y: this.init?.y,
          fillColor:
            colorConfigure.randomColors[
              Math.round(
                Math.random() * (colorConfigure.randomColors.length - 1),
              )
            ],
          radius: particleConfigure.defaultSize,
          ease: 'circ.out',
          duration: 1.5,
          delay: DELAY_ACC * index,
        },
        'start',
      );

      if (maxRamble <= index) {
        tl.addLabel('die', '>');
        gsap.to(
          this,
          {
            radius: 0,
            ease: 'power1.inOut',
            duration: 0.3,
            delay: DELAY_ACC * index,
            onComplete() {
              // killParticle(index);
            },
          },
          // 'die',
        );
      }
    } else {
      const easeList = [
        'back.out(1)',
        'power2.inOut',
        'power2.out',
        'circ.out',
        'expo.out',
      ];
      const tl = gsap
        .timeline({
          smoothChildTiming: true,
          autoRemoveChildren: true,
        })
        .addLabel('setting');

      tl.set(
        this,
        {
          to: {
            x: to.x,
            y: to.y,
          },
          justMove: true,
        },
        'setting',
      ).addLabel('start', '>');

      tl.to(
        this,
        {
          x: to.x,
          y: to.y,
          fillColor: colorConfigure.particleColor,
          radius: particleConfigure.onTextSize,
          ease: easeList[Math.round(Math.random() * easeList.length)],
          delay: DELAY_ACC * this.index,
          duration: 1.5,
        },
        'start',
      ).addLabel('setting2', '>');

      tl.set(
        this,
        {
          justMove: false,
        },
        'setting2',
      );
    }
  }

  toOut() {
    this.justMove = true;
  }

  draw(currentMode: mode) {
    if (currentMode === mode.ramble || this.justMove) {
      this.isChanged = false;
      this.ramble();
    } else {
      if (!this.isChanged) {
        this.isChanged = true;
      }
    }
    this.p5.fill(this.fillColor);
    this.p5.noStroke();
    this.p5.circle(this.x, this.y, this.radius);
  }
}
