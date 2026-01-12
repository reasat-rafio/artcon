import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ParallaxAnimationOptions = {
  disableOnMobile?: boolean;
};

const parallaxAnimation = (node: HTMLElement, options?: ParallaxAnimationOptions) => {
  const { disableOnMobile = false } = options || {};
  
  // Check if we should disable on mobile (screen width < 1024px)
  const shouldDisable = disableOnMobile && typeof window !== 'undefined' && window.innerWidth < 1024;
  
  if (shouldDisable) {
    // On mobile
    gsap.set(node, { y: 0 });
    return {
      destroy() {
      },
    };
  }
  
  const ctx = gsap.context(() => {
    gsap.to(node, {
      y: 0,
      scrollTrigger: {
        start: '-80px bottom',
        end: 'bottom bottom',
        scrub: 3,
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
