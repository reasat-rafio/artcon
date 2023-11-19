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
    class="absolute bottom-0 left-0 z-10 text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] max-lg:px-[1.25rem] max-lg:pb-[2.8rem] lg:p-[3rem] xl:w-[90%] xl:p-[4rem]">
    <h2 class="text-[1.125rem] font-medium">{title}</h2>
    <div class="pt-[0.75rem]">
      <h3 class="inline text-[2.5rem] leading-[1.2]">{name}</h3>
      <h4 class="inline text-[1.125rem] font-medium leading-[0.025rem]">
        / {#if typeof exhibitionType === 'string'}
          {exhibitionType}
        {:else}
          {exhibitionType.en}
        {/if}
      </h4>
    </div>
  </div>
</CollectionLayout>
