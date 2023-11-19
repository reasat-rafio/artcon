import { readable } from 'svelte/store';

export default readable(0, (set) => {
  let columnWidthInPx = 810;
  if (typeof window === 'undefined') return;

  window.addEventListener('resize', calcWidth);
  document.addEventListener('DOMContentLoaded', calcWidth);

  // THE LOAD FUNCTION DOESN'T TRIGGER SOME TIME. THIS IS A HACK TO MAKE IT WORK
  window.dispatchEvent(new Event('resize'));

  function calcWidth() {
    columnWidthInPx = window.innerWidth >= 1280 ? 810 : 600;
    set((columnWidthInPx / window.innerWidth) * 100);
  }

  return () => {
    window.removeEventListener('resize', calcWidth);
    document.removeEventListener('DOMContentLoaded', calcWidth);
  };
});
