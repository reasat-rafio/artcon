<script lang="ts">
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';
  import H7 from '../ui/H7.svelte';
  import Asset from './Asset.svelte';

  export let props: CommonHeroProps & { scrollAmount: number };
  $: ({ text, title, type, asset, cta, scrollAmount } = props);

  let windowHeight = 0;
  $: deltaY = Math.min(scrollAmount / windowHeight, 1);
</script>

<svelte:window bind:innerHeight={windowHeight} />
<section
  style={`filter: blur(${deltaY * 5}px) grayscale(${deltaY * 60}%);`}
  class="{$$props.class ?? ''} h-screen w-full"
>
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header class="space-y-[20px] xl:space-y-[35px]">
        {#if !!text}
          <H7>{text}</H7>
        {/if}
        <H1>{title}</H1>
        {#if !!type}
          <H3 class="whitespace-pre-wrap">{type}</H3>
        {/if}
      </header>
      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
