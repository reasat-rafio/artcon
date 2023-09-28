<script lang="ts">
  import type {
    VrProps,
    WithExtra,
    Collection,
  } from '@/lib/types/landing.types';
  import H8 from '@/components/ui/H8.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import CollectionLayout from './CollectionLayout.svelte';

  export let props: WithExtra<Collection<unknown>>;
  $: ({
    slug,
    index,
    title,
    _type,
    name,
    previewImage,
    DEFAULT_COLUMN_W_PERCENTAGE,
  } = props);
</script>

<CollectionLayout
  href={`preview/${_type}/${slug.current}`}
  {index}
  {DEFAULT_COLUMN_W_PERCENTAGE}
  image={previewImage}
>
  <div class="absolute bottom-[10%] left-[5%] z-10 text-white">
    <H8>{title}</H8>
    <div class="mt-3">
      <H4 class="inline">{name}</H4>
    </div>
  </div>
</CollectionLayout>
