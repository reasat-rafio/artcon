<script lang="ts">
  import type { ExhibitionProps, WithExtra } from '@/lib/types/landing.types';
  import CollectionLayout from './CollectionLayout.svelte';

  export let props: WithExtra<ExhibitionProps>;
  $: ({ slug, index, name, title, exhibitionType, sliderImageVideo } = props);
</script>

<CollectionLayout
  {index}
  {sliderImageVideo}
  href="/preview/exhibition/{slug.current}">
  <div
    class="absolute bottom-0 left-0 z-10 space-y-[0.62rem] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] max-lg:px-[1.25rem] max-lg:pb-[2.8rem] lg:pb-[5rem] lg:pl-[3.38rem] xl:w-[90%]">
    <h2 class="head-6">{title}</h2>
    <div>
      <h3 class="head-4 inline">{name}</h3>
      <h4 class="head-6 inline">
        / {#if typeof exhibitionType === 'string'}
          {exhibitionType}
        {:else}
          {exhibitionType.en}
        {/if}
      </h4>
    </div>
  </div>
</CollectionLayout>
