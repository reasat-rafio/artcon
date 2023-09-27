<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Contact from '@/components/pages/landing/Contact.svelte';
  import Hero from '@/components/pages/landing/Hero.svelte';
  import Collections from '@/components/pages/landing/collections/Collections.svelte';
  import { debounce } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';
  import uiStore from '@/store/ui';
  import { onMount } from 'svelte';
  import { expoOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { gsap } from 'gsap';
  import { Observer } from 'gsap/dist/Observer';

  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos, contact },
  } = data;

  let rootEl: HTMLDivElement;
  let windowWidth = 0;
  const DEFAULT_COLUMN_W_PERCENTAGE = 35;
  const tweenedScrollAmount = tweened(0, { duration: 2500, easing: expoOut });
  $: if (rootEl) rootEl.scrollLeft = $tweenedScrollAmount;
  $: showContact = rootEl?.scrollLeft > rootEl?.clientWidth;

  $: {
    // SCROLL TO THE ACTIVE SLIDE
    if ($uiStore.seclectedPreviewIndex != null) {
      const offSetWidth = (windowWidth / 100) * DEFAULT_COLUMN_W_PERCENTAGE;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
        { duration: 600 },
      );
    }
  }

  onMount(() => {
    gsap.registerPlugin(Observer);

    Observer.create({
      target: window,
      type: 'wheel,scrool',

      onChange: (self) => {
        tweenedScrollAmount.set(
          rootEl?.scrollLeft + self.deltaY + self.velocityY * 0.1,
        );
      },
    });

    if ($uiStore.seclectedPreviewIndex != null) {
      const offSetWidth = (windowWidth / 100) * DEFAULT_COLUMN_W_PERCENTAGE;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
        { duration: 0 },
      );
      uiStore.setActivePreview(null);
    }
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />
<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div
  bind:this={rootEl}
  class="fixed inset-0 isolate h-screen w-screen overflow-hidden"
>
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero
        class="fixed inset-0"
        props={{ ...s, scrollAmount: $tweenedScrollAmount }}
      />
      {#if showContact}
        <Contact {contact} />
      {/if}
    {:else if s._type === 'landing.collections'}
      <Collections props={{ ...s, DEFAULT_COLUMN_W_PERCENTAGE }} />
    {/if}
  {/each}
</div>
