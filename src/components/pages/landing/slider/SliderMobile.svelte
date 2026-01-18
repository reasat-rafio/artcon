<script lang="ts">
  import Contact from '@/components/pages/landing/Contact.svelte';
  import type { ContactProps } from '@/lib/types/common.types';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';
  import { Observer } from 'gsap/dist/Observer';
  import { onMount } from 'svelte';
  import SliderItem from './SliderItem.svelte';
  import { cn } from '@/lib/cn';

  export let props: CollectionsProps & { contact: ContactProps };
  $: ({ collections, contact } = props);

  let animating = false;
  let currentIndex = 0;
  let innerWidth = 0;
  let innerHeight = 0;
  let isLoaded = false;

  onMount(() => {
    gsap.registerPlugin(Observer);

    const rootEl = document.querySelector('#landing-page') as HTMLElement;
    
    // Only apply GSAP animations on desktop
    if (innerWidth >= 1024) {
      adjustInitialScrollPosition(rootEl);

      let ctx = gsap.context(() => {
        if (isLoaded) handleEventObserver(rootEl);
      });
      return () => ctx.revert();
    }
  });

  function adjustInitialScrollPosition(el: HTMLElement) {
    if ($uiStore.selectedPreviewIndex !== null && innerWidth < 1024) {
      gsap.to(el, {
        duration: 0,
        y: `-${($uiStore.selectedPreviewIndex + 1) * 100}dvh`,
      });

      currentIndex = $uiStore.selectedPreviewIndex + 1;
      uiStore.setActivePreview(null);
    }
  }

  function handleEventObserver(el: HTMLElement) {
    // Custom scroll animations for desktop
    Observer.create({
      target: window,
      type: 'wheel,scroll,touch',
      wheelSpeed: -1,
      tolerance: 50,
      preventDefault: false,
      onDown: () => {
        if (!animating) {
          currentIndex = Math.min(
            Math.max(0, currentIndex - 1),
            collections.length + 1,
          );
          gsap.to(el, {
            duration: 0.5,
            y: `-${currentIndex * 100}dvh`,
            ease: 'power2.out',
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
            collections.length + 1,
          );
          gsap.to(el, {
            duration: 0.5,
            y: `-${currentIndex * 100}dvh`,
            ease: 'power2.out',
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
  }

  function loaded(_: HTMLElement) {
    if (
      document.readyState === 'interactive' ||
      document.readyState === 'complete'
    ) {
      isLoaded = true;
    } else {
      document.onreadystatechange = () => {
        if (document.readyState == 'complete') {
          isLoaded = true;
        }
      };
    }
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<section
  class={cn('z-40 block lg:hidden', {
    'fixed inset-0': !isLoaded,
    'translate-y-[100dvh]': innerWidth >= 1024,
    'mt-[100dvh]': innerWidth < 1024,
  })}>
  <div use:loaded id="mobile-slider-wrapper" class="flex flex-col">
    {#each collections as collection, index}
      <SliderItem props={{ ...collection, index }} />
    {/each}
    <Contact {contact} />
  </div>
</section>
