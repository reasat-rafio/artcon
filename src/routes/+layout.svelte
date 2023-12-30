<script lang="ts">
  import '@/app.css';
  import PageLoadProgressBar from '@/components/common/PageLoadProgressBar.svelte';
  import uiStore from '@/store/ui';
  import { beforeUpdate, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { raf } from '@/utils/tempus';
  import { useScroll } from '@/lib/lifecycle-functions/useScroll';
  import { useFrame } from '@/lib/lifecycle-functions/useFrame';
  import Lenis from '@studio-freight/lenis';
  import { lenisStore as lenis, setLenisStore } from '@/store/lenis';

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
    uiStore.setMobileNavDropdown(false);

    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const lenisInstance = new Lenis();
    setLenisStore(lenisInstance);

    return () => {
      $lenis?.destroy();
    };
  });

  beforeUpdate(() => {
    uiStore.setMobileNavDropdown(false);
  });
  useFrame((time) => {
    $lenis?.raf(time);
  });
</script>

<PageLoadProgressBar />
<slot />
