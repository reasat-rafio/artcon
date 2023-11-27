<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';

  export let title: string;
  export let showNav: boolean;
  export let scrollNext: () => void;
  export let scrollPrev: () => void;

  let innerWidth = 0;
  let headerEl: HTMLElement;
  let headerElLeftPos = 0;

  $: if (!!headerEl && innerWidth) {
    headerElLeftPos = headerEl.getBoundingClientRect().left;
  }
</script>

<svelte:window bind:innerWidth />
<section>
  <div
    bind:this={headerEl}
    class="container-primary mb-[3.125rem] border-b-[0.5px] border-[#D2D2D3] pb-[2.17rem] pt-[2.58rem]">
    <h2 class="head-4">{title}</h2>
  </div>

  <div
    id="search_result_items"
    style="--leftPos: {headerElLeftPos}px"
    class={cn(
      'flex w-full max-w-[85.3rem] flex-col items-center pb-[4.375rem] max-lg:px-[1rem] max-md:mx-auto md:mr-[1rem] xl:flex-row xl:gap-x-[2rem] 2xl:gap-x-[4.375rem]',
      $$props.class,
    )}>
    <slot />

    <nav
      class:invisible={!showNav}
      class="flex h-full items-center justify-center">
      <button class="hidden xl:block" on:click={scrollNext}>
        <svg
          class="h-[2.8125rem] w-[2.8125rem] transition-transform duration-500 hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="46"
          viewBox="0 0 45 46"
          fill="none">
          <path
            d="M23.2334 17.6719L22.4977 18.4234L27.0066 23.0588H17V24.1346H27.0066L22.4977 28.778L23.2334 29.5295L29 23.5967L23.2334 17.6719Z"
            fill="#252525" />
          <circle cx="22.5" cy="23.1719" r="22" stroke="#C0C0C0" />
        </svg>
      </button>
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
</section>

<style>
  @media screen and (min-width: 768px) {
    #search_result_items {
      margin-left: var(--leftPos);
    }
  }
</style>
