<script lang="ts">
  import type { NavProps } from '@/lib/types/common.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  export let nav: NavProps;
  let { menu } = nav;

  let windowWidth = 0;
  const TWEEN_IN_BG_DURATION = 0.8;
  const TWEEN_OUT_BG_DURATION = 0.8;
  const ANIMATION_PROPS = {
    y: '-100%',
    duration: TWEEN_OUT_BG_DURATION,
    ease: 'power4.out',
  };
  $: if (windowWidth >= 1024) uiStore.setMobileNavDropdown(false);

  onMount(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    const disableScrolling = () => {
      window.scrollTo({
        top: scrollTop,
        left: scrollLeft,
        behavior: 'instant',
      });
    };
    window.addEventListener('scroll', disableScrolling);
    return () => {
      window.removeEventListener('scroll', disableScrolling);
    };
  });

  function backgroundAnimation(node: HTMLElement) {
    gsap.killTweensOf(node);
    const animate = gsap.to(node, {
      y: 0,
      duration: TWEEN_IN_BG_DURATION,
      ease: 'power4.out',
    });

    return {
      duration: TWEEN_IN_BG_DURATION * 1000,
      tick: (t: number) => {
        animate.progress(t);
      },
    };
  }

  const animateDropDownItems = (_: HTMLElement) => {
    const dropdownItems = document.querySelectorAll('.dropdownItems');
    dropdownItems.forEach((item) => gsap.killTweensOf(item));
    gsap.to('.dropdownItems', {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      stagger: 0.06,
      ease: 'elastic.out(0.5, 0.5)',
      delay: 0.6,
    });
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />
<aside
  transition:backgroundAnimation
  class="fixed top-0 z-[1002] !h-[100vh] !w-[100vw] -translate-y-full bg-red-800">
  <nav
    transition:backgroundAnimation
    class="flex h-full w-full -translate-y-full items-center bg-[#000]">
    <ul use:animateDropDownItems class="flex flex-col gap-y-3 overflow-auto">
      {#each menu as { _key, title, externalUrl, pageUrl } (_key)}
        <li class="overflow-hidden text-white">
          <a
            href={pageUrl || externalUrl}
            class="dropdownItems head-8 block translate-y-full pl-8 font-medium uppercase">
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>
