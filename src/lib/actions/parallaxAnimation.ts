import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const parallaxAnimation = (node: HTMLElement) => {
  const ctx = gsap.context(() => {
    gsap.to(node, {
      y: 0,
      scrollTrigger: {
        start: '-120px bottom',
        end: 'bottom bottom',
        scrub: 2,
        trigger: node,
      },
    });
  });
  return {
    destroy() {
      ctx.revert();
    },
  };
};

export default parallaxAnimation;
