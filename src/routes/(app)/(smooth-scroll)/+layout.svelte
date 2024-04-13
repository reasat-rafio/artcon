<script lang="ts">
  import Lenis from '@studio-freight/lenis';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  import { lenisStore as lenis, setLenisStore } from '@/store/lenis';
  import { raf } from '@/utils/tempus';
  import { useFrame } from '@/lib/lifecycle-functions/useFrame';
  import { useScroll } from '@/lib/lifecycle-functions/useScroll';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';

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

  onMount(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const lenisInstance = new Lenis();
    setLenisStore(lenisInstance);

    return () => {
      $lenis?.destroy();
    };
  });

  useFrame((time) => {
    $lenis?.raf(time);
  });

  afterNavigate(() => {
    $lenis?.scrollTo(0, { immediate: true });
  });
</script>

<slot />
