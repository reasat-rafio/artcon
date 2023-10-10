<script lang="ts">
  import type { ExhibitionProps, WithExtra } from '@/lib/types/landing.types';
  import CollectionLayout from './CollectionLayout.svelte';

  export let props: WithExtra<ExhibitionProps>;
  $: ({
    slug,
    index,
    name,
    title,
    exhibitionType,
    previewDisplayImage,
    DEFAULT_COLUMN_W_PERCENTAGE,
  } = props);
</script>

<CollectionLayout
  {DEFAULT_COLUMN_W_PERCENTAGE}
  href="/preview/exhibition/{slug.current}"
  image={previewDisplayImage}
  {index}
>
  <div
    class="absolute bottom-0 left-0 z-10 p-[4rem] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] xl:w-[90%]"
  >
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
