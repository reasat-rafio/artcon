<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';

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
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
