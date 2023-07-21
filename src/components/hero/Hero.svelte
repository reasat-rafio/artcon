<script lang="ts">
  import H1 from '@/components/ui/H1.svelte';
  import H3 from '@/components/ui/H3.svelte';
  import Asset from './Asset.svelte';
  import type { CommonHeroProps } from '@/lib/types/common.types';

  export let props: CommonHeroProps;
  let { type, title, subtitle, asset, cta } = props;
</script>

<section class="h-screen w-screen">
  <div class="relative flex h-full w-full items-center justify-center">
    <Asset {asset} />

    <div class="container relative z-30 text-center text-white">
      <header>
        {#if !!type}
          <!--  -->
        {/if}

        <H1>{title}</H1>
        {#if !!subtitle}
          <H3 class="whitespace-pre-wrap">{subtitle}</H3>
        {/if}
      </header>

      {#if !!cta?.title}
        <a href={cta.href}>{cta.title}</a>
      {/if}
    </div>
  </div>
</section>
