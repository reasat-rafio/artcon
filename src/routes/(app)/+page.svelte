<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';
  import Collections from '@/components/pages/landing/collections/Collections.svelte';
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';
  import uiStore from '@/store/ui';
  import { debounce } from '@/lib/helper';
  import { onMount } from 'svelte';

  type MouseEvnt = WheelEvent & {
    currentTarget: EventTarget & Window;
  };
  export let data: PageProps<HomePageProps>;
  let {
    page,
    site: { logos },
  } = data;

  let rootEl: HTMLDivElement;
  let windowWidth = 0;
  const SCROLL_SPEED = 700;
  const DEFAULT_COLUMN_W_PERCENTAGE = 35;
  const tweenedScrollAmount = tweened(0, { duration: 2500, easing: expoOut });

  $: if (rootEl) rootEl.scrollLeft = $tweenedScrollAmount;
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
    if ($uiStore.seclectedPreviewIndex != null) {
      const offSetWidth = (windowWidth / 100) * DEFAULT_COLUMN_W_PERCENTAGE;
      tweenedScrollAmount.set(
        windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
        { duration: 0 },
      );
      uiStore.setActivePreview(null);
    }
  });

  const scrollAction = debounce((event: MouseEvnt) => {
    const scrollAmount = event.deltaY > 0 ? SCROLL_SPEED : -SCROLL_SPEED;
    tweenedScrollAmount.set(rootEl.scrollLeft + scrollAmount);
  }, 30);
</script>

<svelte:window bind:innerWidth={windowWidth} on:wheel={scrollAction} />
<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div bind:this={rootEl} class="fixed inset-0 h-screen w-screen overflow-hidden">
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero
        class="fixed inset-0"
        props={{ ...s, scrollAmount: $tweenedScrollAmount }}
      />
    {:else if s._type === 'landing.collections'}
      <Collections props={{ ...s, DEFAULT_COLUMN_W_PERCENTAGE }} />
    {/if}
  {/each}
</div>
