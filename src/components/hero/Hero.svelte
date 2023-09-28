<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import ChevronDown from '../icons/ChevronDown.svelte';
  import Cta from '../ui/Cta.svelte';

  export let props: CommonHeroProps;
  let { text, title, type, asset, cta } = props;
</script>

<section class={twMerge('h-screen w-full', $$props.class)}>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header class="space-y-2">
        {#if !!text}
          <h3 class="head-md">{text}</h3>
        {/if}
        <h1 class="head-5xl">{title}</h1>
        {#if !!type}
          <h2 class="head-3xl">{type}</h2>
        {/if}
      </header>
      {#if !!cta?.title}
        <Cta variant="fill" color="white" class="mx-auto" href={cta.href}
          >{cta.title}</Cta
        >
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
