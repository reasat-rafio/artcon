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
    class="absolute bottom-[10%] left-[5%] z-10 text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem]"
  >
    <h2 class="text-[1.25rem] font-medium leading-[0.025rem]">{title}</h2>
    <div class="mt-3">
      <h3 class="inline text-[2rem] tracking-[0.04rem]">{name}</h3>
      <h4 class="inline text-[1.25rem] font-medium leading-[0.025rem]">
        / {#if typeof exhibitionType === 'string'}
          {exhibitionType}
        {:else}
          {exhibitionType.en}
        {/if}
      </h4>
    </div>
  </div>
</CollectionLayout>
