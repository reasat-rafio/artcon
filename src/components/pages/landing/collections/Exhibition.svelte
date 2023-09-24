<script lang="ts">
  import type { ExhibitionProps, WithExtra } from '@/lib/types/landing.types';
  import H8 from '@/components/ui/H8.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H6 from '@/components/ui/H6.svelte';
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
  <div class="absolute bottom-[10%] left-[5%] z-10 text-white">
    <H8>{title}</H8>
    <div class="mt-3">
      <H4 class="inline">{name}</H4>
      <H6 class="inline"
        >/ {#if typeof exhibitionType === 'string'}
          {exhibitionType}
        {:else}
          {exhibitionType.en}
        {/if}</H6
      >
    </div>
  </div>
</CollectionLayout>
