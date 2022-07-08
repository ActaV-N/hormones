import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
// Before particle
const BeforeParticle = () => {
  const beforeParticleSection: Element | null =
    document.querySelector('.before-particle');

  const visuals = beforeParticleSection?.querySelectorAll(
    '.visual-wrap',
  ) as NodeList;
  const texts = beforeParticleSection?.querySelectorAll(
    '.text-wrap',
  ) as NodeList;

  const containerLength = visuals.length;

  const activateContainer = (index: number) => {
    const visual = visuals[index] as Element;
    const img = visual.querySelector('img');
    const text = texts[index];

    const tl = gsap.timeline().addLabel('start');

    gsap.killTweensOf(visual, 'autoAlpha');
    tl.to(
      visual,
      {
        autoAlpha: 1,
        ease: 'power1.inOut',
        duration: 0.6,
      },
      'start',
    );

    gsap.killTweensOf(img, 'transform');
    tl.to(
      img,
      {
        scale: 1.2,
        duration: 0.6,
        ease: 'power1.inOut',
      },
      'start',
    );

    gsap.killTweensOf(text, 'transform, autoAlpha');
    tl.to(
      text,
      {
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power1.inOut',
      },
      'start+=0.15',
    )
      .addLabel('textMove', '<')
      .to(
        text,
        {
          translateX: '-50%',
          duration: 0.6,
          ease: 'power2.out',
        },
        'textMove+=0.1',
      );
  };

  const deactivateContainer = (index: number) => {
    if (index === containerLength) return;
    const visual = visuals[index] as Element;
    const img = visual.querySelector('img');
    const text = texts[index];
    const tl = gsap.timeline().addLabel('start');

    gsap.killTweensOf(img, 'transform');
    tl.to(
      img,
      {
        scale: 0.95,
        duraiton: 0.4,
        ease: 'power1.inOut',
      },
      'start',
    );

    gsap.killTweensOf([text, visual], 'autoAlpha');
    tl.to(
      [text, visual],
      {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      },
      'start+=.1',
    );

    tl.set(text, {
      translateX: '-70%',
    });
  };
  let prevIndex = 0;
  ScrollTrigger.create({
    trigger: beforeParticleSection,
    pin: beforeParticleSection?.querySelector('.pin-container'),
    start: 'top top',
    end: 'bottom bottom',
    onUpdate(e) {
      const ratio = e.progress;
      const trigger: any = e.trigger;
      const current = trigger?.dataset?.active * 1;

      for (let i = 1; i <= containerLength; i++) {
        if (
          ratio > ((i - 1) * 1) / (containerLength + 1) &&
          ratio < (i * 1) / (containerLength + 1)
        ) {
          if (prevIndex !== current) {
            deactivateContainer(prevIndex);
            activateContainer(current);
          }
          trigger.dataset.active = i - 1;
          break;
        }
      }
      if (
        ratio > (containerLength * 1) / (containerLength + 1) &&
        ratio < ((containerLength + 1) * 1) / (containerLength + 1)
      ) {
        if (prevIndex !== current) {
          console.log('finish');
        }
        trigger.dataset.active = containerLength;
      }

      prevIndex = current;
    },
  });

  activateContainer(0);
};

export default BeforeParticle;
