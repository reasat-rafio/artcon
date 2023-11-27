<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightLongRounded from '@/components/icons/ChevronRightLongRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import { scale, slide } from 'svelte/transition';

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
<section>
  <div
    bind:this={headerEl}
    class="container-primary mb-[3.125rem] border-b-[0.5px] border-[#D2D2D3] pb-[2.17rem] pt-[2.58rem]">
    <h2 class="head-4">{title}</h2>
  </div>

  {#if layoutLoading}
    <div
      transition:slide={{ duration: 400 }}
      id="search_result_items"
      style="--leftPos: {headerElLeftPos}px"
      class={cn(
        'flex w-full max-w-[85.3rem] flex-col items-center pb-[4.375rem] max-2xl:px-[1rem] max-md:mx-auto md:mr-[1rem] xl:flex-row xl:gap-x-[2rem] 2xl:gap-x-[4.375rem]',
        $$props.class,
      )}>
      <slot />

      <nav
        class:invisible={!showNav}
        class="flex h-full items-center justify-center">
        <div class="hidden space-y-[0.5rem] xl:block">
          {#if carouselCanScrollPrev}
            <button class="rotate-180" on:click={scrollPrev}>
              <ChevronRightLongRounded />
            </button>
          {/if}
          {#if carouselCanScrollNext}
            <button on:click={scrollNext}>
              <ChevronRightLongRounded />
            </button>
          {/if}
        </div>
        <div class="mt-[2.38rem] block space-x-[0.62rem] xl:hidden">
          <button on:click={scrollPrev}>
            <ChevronLeftRounded />
          </button>
          <button on:click={scrollNext}>
            <ChevronRightRounded />
          </button>
        </div>
      </nav>
    </div>
  {/if}
</section>

<style>
  @media screen and (min-width: 768px) {
    #search_result_items {
      margin-left: var(--leftPos);
    }
  }
</style>
