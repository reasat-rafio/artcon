<script lang="ts">
  import ChevronRightLongRounded from '@/components/icons/ChevronRightLongRounded.svelte';
  import { cn } from '@/lib/cn';
  import searchStore from '@/store/search';
  import { fade, slide } from 'svelte/transition';

  export let title: string;
  export let showNav: boolean;
  export let carouselCanScrollPrev: boolean;
  export let carouselCanScrollNext: boolean;
  export let scrollNext: () => void;
  export let scrollPrev: () => void;

  let innerWidth = 0;
  let headerEl: HTMLElement;
  let headerElLeftPos = 0;
  let layoutLoading = false;

  $: if (!!headerEl && innerWidth) {
    headerElLeftPos = headerEl.getBoundingClientRect().left;
    layoutLoading = true;
  }
</script>

<svelte:window bind:innerWidth />
<section transition:slide>
  <div
    bind:this={headerEl}
    class="container-primary mb-[1.25rem] border-b-[0.5px] border-light-gray py-[1.25rem] lg:mb-[3.125rem] lg:pb-[2.17rem] lg:pt-[2.58rem]">
    {#if $searchStore.loading}
      <div in:fade class="h-10 !w-[50%] animate-pulse bg-gray-300"></div>
    {:else}
      <h2 in:fade class="head-4">{title}</h2>
    {/if}
  </div>

  {#if layoutLoading}
    <div
      transition:slide={{ duration: 400 }}
      style="--leftPos: {headerElLeftPos}px"
      class:search_result_items={innerWidth >= 1280}
      class={cn(
        'flex w-full flex-col px-[1rem] pb-[4.375rem] lg:mr-[1rem] xl:flex-row xl:items-center xl:gap-x-[2rem] 2xl:gap-x-[4.375rem]',
        { '!mx-auto w-full lg:w-[calc(100%-22rem)]': innerWidth < 1279 },
        $$props.class,
      )}>
      <slot />

      <nav
        class:invisible={!showNav || $searchStore.loading}
        class="flex h-full items-center justify-center">
        <div class="hidden space-y-[0.5rem] xl:block">
          {#if carouselCanScrollPrev}
            <button
              aria-label="Scroll to next slide"
              class="rotate-180"
              on:click={scrollPrev}>
              <ChevronRightLongRounded />
            </button>
          {/if}
          {#if carouselCanScrollNext}
            <button aria-label="Scroll to next slide" on:click={scrollNext}>
              <ChevronRightLongRounded />
            </button>
          {/if}
        </div>
        <div class="mt-[2.38rem] block space-x-[0.62rem] xl:hidden">
          <button
            aria-label="Scroll to previous slide"
            class="rotate-180"
            on:click={scrollPrev}>
            <ChevronRightLongRounded />
          </button>
          <button aria-label="Scroll to right slide" on:click={scrollNext}>
            <ChevronRightLongRounded />
          </button>
        </div>
      </nav>
    </div>
  {/if}
</section>

<style>
  @media screen and (min-width: 1280px) {
    .search_result_items {
      max-width: calc(85.3rem + var(--leftPos));
      padding-left: var(--leftPos);
    }
  }
</style>
