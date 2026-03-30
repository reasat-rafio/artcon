<script lang="ts">
  import Lenis from '@studio-freight/lenis';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount, tick } from 'svelte';
  import { get } from 'svelte/store';
  import { lenisStore as lenis, setLenisStore } from '@/store/lenis';
  import { raf } from '@/utils/tempus';
  import { useFrame } from '@/lib/lifecycle-functions/useFrame';
  import { useScroll } from '@/lib/lifecycle-functions/useScroll';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import uiStore from '@/store/ui';

  if (browser) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.ticker.remove(gsap.updateRoot);

    raf.add((time) => {
      gsap.updateRoot(time! / 1000);
    }, 0);
  }

  useScroll(ScrollTrigger.update);

  $: if (browser && $lenis) {
    ScrollTrigger.refresh();
    $lenis.start();
  }

  const syncScrollAndTriggers = async () => {
    if ($uiStore.preventScrollToTop) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    await tick();

    requestAnimationFrame(() => {
      const lenisInstance = get(lenis);
      lenisInstance?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
      ScrollTrigger.update();

      requestAnimationFrame(() => {
        const nextLenisInstance = get(lenis);
        nextLenisInstance?.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      });
    });
  };

  onMount(() => {
    window.history.scrollRestoration = 'manual';

    const lenisInstance = new Lenis();
    setLenisStore(lenisInstance);

    syncScrollAndTriggers();

    return () => {
      $lenis?.destroy();
    };
  });

  useFrame((time) => {
    $lenis?.raf(time);
  });

  afterNavigate(() => {
    syncScrollAndTriggers();
  });
</script>

<slot />
