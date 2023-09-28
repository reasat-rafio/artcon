<script lang="ts">
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import Asset from '@/components/hero/Asset.svelte';
  import ChevronDown from '@/components/icons/ChevronDown.svelte';

  export let props: CommonHeroProps & { scrollAmount: number };
  $: ({ text, title, type, asset, cta, scrollAmount } = props);

  let windowHeight = 0;
  let windowWidth = 0;
  $: deltaY =
    windowWidth >= 1024 ? Math.min(scrollAmount / windowHeight, 1) : 0;
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} />
<section
  style={`filter: blur(${deltaY * 5}px) grayscale(${deltaY * 60}%);`}
  class="{$$props.class ?? ''} h-screen w-full"
>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header class="space-y-[1.25rem] xl:space-y-[2.188rem]">
        {#if !!text}
          <h3 class="head-md">{text}</h3>
        {/if}
        <h1 class="head-5xl">{title}</h1>

        {#if !!type}
          <h2 class="head-3xl whitespace-pre-wrap">{type}</h2>
        {/if}
      </header>
      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>

    <div
      class="absolute max-lg:bottom-[10%] max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0 lg:top-1/2 lg:-translate-y-1/2"
    >
      <div
        class="flex items-center justify-center space-x-[1.06rem] text-[#E8E6E3] lg:pr-[2.5rem]"
      >
        <span class="text-[0.84375rem] font-medium tracking-[0.01688rem]"
          >Discover our stories</span
        >
        <ChevronDown class="chevron-icon animate-bounce" />
      </div>
    </div>
  </div>
</section>
