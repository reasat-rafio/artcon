<script lang="ts">
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { Observer } from 'gsap/dist/Observer';
  import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
  import Vr from '@/components/pages/landing/collections/VR.svelte';
  import Exhibition from '@/components/pages/landing/collections/Exhibition.svelte';
  import uiStore from '@/store/ui';

  export let props: CollectionsProps;
  $: ({ collections } = props);

  let animating = false;
  let currentIndex = 0;
  let innerWidth = 0;

  onMount(() => {
    gsap.registerPlugin(Observer, ScrollToPlugin);
    let ctx = gsap.context(() => {
      if ($uiStore.seclectedPreviewIndex !== null && innerWidth < 1024) {
        gsap.to(window, {
          duration: 0.001,
          scrollTo: window.innerHeight * ($uiStore.seclectedPreviewIndex + 1),
        });
        currentIndex = $uiStore.seclectedPreviewIndex + 1;
        uiStore.setActivePreview(null);
      }

      Observer.create({
        target: window,
        type: 'wheel,scrool,touch',
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onDown: () => {
          if (!animating) {
            currentIndex = Math.min(
              Math.max(0, currentIndex - 1),
              collections.length,
            );
            gsap.to(window, {
              duration: 0.4,
              scrollTo: window.innerHeight * currentIndex,
              ease: 'expoOut',
              onStart: () => {
                animating = true;
              },
              onComplete: () => {
                animating = false;
              },
            });
          }
        },
        onUp: () => {
          if (!animating) {
            currentIndex = Math.min(
              Math.max(0, currentIndex + 1),
              collections.length,
            );
            gsap.to(window, {
              duration: 0.7,
              scrollTo: window.innerHeight * currentIndex,
              ease: 'expoOut',
              onStart: () => {
                animating = true;
              },
              onComplete: () => {
                animating = false;
              },
            });
          }
        },
      });
    });
    return () => ctx.revert();
  });
</script>

<svelte:window bind:innerWidth />
<section class="z-40 block translate-y-[100vh] lg:hidden">
  <div class="flex flex-col">
    {#each collections as collection, index}
      {#if collection._type === 'exhibition'}
        <Exhibition props={{ ...collection, index }} />
      {:else if collection._type === 'vr'}
        <Vr props={{ ...collection, index }} />
      {/if}
    {/each}
  </div>
</section>
