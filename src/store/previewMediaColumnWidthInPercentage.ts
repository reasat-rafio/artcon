import { readable } from 'svelte/store';

const COLUM_WIDTH_IN_PX = 810;

export default readable(0, (set) => {
  if (typeof window === 'undefined') return;

  window.addEventListener('resize', calcWidth);
  document.addEventListener('DOMContentLoaded', calcWidth);

  // THE LOAD FUNCTION DOESN'T TRIGGER SOME TIME. THIS IS A HACK TO MAKE IT WORK
  window.dispatchEvent(new Event('resize'));

  function calcWidth() {
    set((COLUM_WIDTH_IN_PX / window.innerWidth) * 100);
  }

  return () => {
    window.removeEventListener('resize', calcWidth);
    document.removeEventListener('DOMContentLoaded', calcWidth);
  };
});
