<script lang="ts">
  import type { NavProps } from '@/lib/types/common.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';

  export let nav: NavProps;
  let { menu } = nav;

  const TWEEN_IN_BG_DURATION = 1.2;
  const TWEEN_OUT_BG_DURATION = 0.8;
  let windowWidth = 0;
  $: if (windowWidth >= 1024) uiStore.setMobileNavDropdown(false);

  function tweenInBg(node: HTMLElement) {
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

  function tweenOut(node: HTMLElement) {
    const animate = gsap.from(node, {
      y: '-100%',
      duration: TWEEN_OUT_BG_DURATION,
      ease: 'power4.out',
    });

    const dropdownItemsAnimation = gsap.from('.dropdownItems', {
      y: '-100%',
      stagger: 0.06,
      ease: 'power4.out',
    });

    return {
      duration: TWEEN_OUT_BG_DURATION * 1000,
      tick: (t: number) => {
        animate.progress(t);
        dropdownItemsAnimation.progress(t);
      },
    };
  }

  function tweenOut2(node: HTMLElement) {
    const animate = gsap.from(node, {
      y: '-100%',
      duration: TWEEN_OUT_BG_DURATION,
      ease: 'power4.out',
    });

    return {
      duration: TWEEN_OUT_BG_DURATION * 1000,
      tick: (t: number) => {
        animate.progress(t);
      },
    };
  }

  const animateDropDownItems = (_: HTMLElement) => {
    gsap.to('.dropdownItems', {
      y: 0,
      stagger: 0.06,
      ease: 'power4.out',
      delay: 0.6,
    });
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />
<aside
  in:tweenInBg
  out:tweenOut
  class="fixed top-0 z-[1002] h-screen w-screen -translate-y-full bg-red-800">
  <nav
    in:tweenInBg
    out:tweenOut2
    class="flex h-full w-full -translate-y-full items-center bg-[#000]">
    <ul use:animateDropDownItems class="flex flex-col gap-y-4 overflow-auto">
      {#each menu as { _key, title, externalUrl, pageUrl } (_key)}
        <li class="overflow-hidden text-white">
          <a
            on:click={() => uiStore.toggleMobileNavDropdown()}
            href={pageUrl || externalUrl}
            class="dropdownItems block translate-y-full pl-8 text-head-6 font-medium uppercase">
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>
