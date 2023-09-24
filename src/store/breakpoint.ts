import { breakpoints, type Breakpoints } from '@/lib/constant';
import { readable } from 'svelte/store';

function getCurrentBreakpoint(): Breakpoints {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  let currentBreakpoint: Breakpoints = 'sm';

  for (const breakpoint in breakpoints) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (windowWidth >= breakpoints[breakpoint]) {
      currentBreakpoint = breakpoint as Breakpoints;
    } else {
      break;
    }
  }

  return currentBreakpoint;
}

export default readable<Breakpoints>(getCurrentBreakpoint(), (set) => {
  function handleResize() {
    set(getCurrentBreakpoint());
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    }
  };
});
