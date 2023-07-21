<script lang="ts">
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';

  export let props: CommonHeroProps;
  let { title, subtitle, asset, cta } = props;
</script>

<section class="fixed inset-0 h-screen w-screen">
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 max-w-3xl text-center text-white">
      <header>
        <H1>{title}</H1>
        <H3 class="whitespace-pre-wrap">{subtitle}</H3>
      </header>

      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
