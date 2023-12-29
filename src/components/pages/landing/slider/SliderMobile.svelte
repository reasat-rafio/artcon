<script lang="ts">
  import Contact from '@/components/pages/landing/Contact.svelte';
  import type { ContactProps } from '@/lib/types/common.types';
  import type { CollectionsProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { gsap } from 'gsap';
  import { Observer } from 'gsap/dist/Observer';
  import { onMount } from 'svelte';
  import SliderItem from './SliderItem.svelte';
  gsap.registerPlugin(Observer);

  export let props: CollectionsProps & { contact: ContactProps };
  $: ({ collections, contact } = props);

  let animating = false;
  let currentIndex = 0;
  let innerWidth = 0;
  let scrollY = 0;

  $: scrollStops = Array.from(
    { length: collections.length + 2 },
    (_, index) => index * 100,
  );

  onMount(() => {
    const rootEl = document.querySelector('#landing-page') as HTMLElement;

    adjustInitialScrollPosition(rootEl);
    let ctx = gsap.context(() => {
      handleEventObserver(rootEl);
    });
    return () => ctx.revert();
  });

  function adjustInitialScrollPosition(el: HTMLElement) {
    if ($uiStore.selectedPreviewIndex !== null) {
      gsap.to(el, {
        duration: 0,
        y: `-${($uiStore.selectedPreviewIndex + 1) * 100}dvh`,
      });

      currentIndex = $uiStore.selectedPreviewIndex + 1;
      uiStore.setActivePreview(null);
    }
  }

  function handleEventObserver(el: HTMLElement) {
    Observer.create({
      target: window,
      type: 'wheel,scroll,touch',
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onDown: () => {
        if (!animating) {
          currentIndex = Math.min(
            Math.max(0, currentIndex - 1),
            collections.length + 1,
          );
          gsap.to(el, {
            duration: 0.7,
            // y: `-${currentIndex * 100}dvh`,
            y: `-${scrollStops[currentIndex]}dvh`,
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
            collections.length + 1,
          );
          gsap.to(el, {
            duration: 0.7,
            y: `-${scrollStops[currentIndex]}dvh`,
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
  }
</script>

<svelte:window bind:innerWidth bind:scrollY />
<section class="z-40 block translate-y-[100dvh] lg:hidden">
  <div class="flex flex-col">
    {#each collections as collection, index}
      <SliderItem props={{ ...collection, index }} />
    {/each}
    <Contact {contact} />
  </div>
</section>
