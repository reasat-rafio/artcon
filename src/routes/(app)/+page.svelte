<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Hero from '@/components/hero/Hero.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { HomePageProps } from '@/lib/types/landing.types';
  import Collections from '@/components/pages/landing/collections/Collections.svelte';
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';
  import uiStore from '@/store/ui';

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
  const SCROLL_AMOUNT = 600;
  const tweenedScrollAmount = tweened(0, { duration: 2500, easing: expoOut });
  $: if (rootEl) rootEl.scrollLeft = $tweenedScrollAmount;

  const scrollAction = (event: MouseEvnt) => {
    const scrollingUp = event.deltaY > 0 ? true : false;
    if (scrollingUp) tweenedScrollAmount.set(rootEl.scrollLeft + SCROLL_AMOUNT);
    else tweenedScrollAmount.set(rootEl.scrollLeft - SCROLL_AMOUNT);
  };

  const sceollActiveSlidesPosition = () => {
    if ($uiStore.seclectedPreviewIndex == null) return;

    const offSetWidth = (windowWidth / 100) * 30;
    tweenedScrollAmount.set(
      windowWidth + offSetWidth * $uiStore.seclectedPreviewIndex,
      { duration: 600 },
    );
  };

  $: $uiStore.seclectedPreviewIndex, sceollActiveSlidesPosition();
</script>

<svelte:window bind:innerWidth={windowWidth} on:wheel={scrollAction} />
<Seo seo={page?.seo} siteOgImg={logos?.ogImage} />
<div class="fixed inset-0 h-screen w-screen overflow-hidden" bind:this={rootEl}>
  {#each page.sections as s}
    {#if s._type === 'common.hero'}
      <Hero class="fixed inset-0" props={s} />
    {:else if s._type === 'landing.collections'}
      <Collections props={s} />
    {/if}
  {/each}
</div>
