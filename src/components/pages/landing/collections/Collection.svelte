<script lang="ts">
  import type { WithExtra, Collection } from '@/lib/types/landing.types';
  import CollectionLayout from './CollectionLayout.svelte';

  export let props: WithExtra<Collection<unknown>>;
  $: ({
    slug,
    index,
    title,
    _type,
    name,
    subtitle,
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
  <div
    class="absolute bottom-[10%] left-[5%] z-10 text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem]"
  >
    <h2 class="text-[1.25rem] font-medium leading-[0.025rem]">{title}</h2>
    <div class="mt-[0.62rem]">
      <h3 class="inline text-[2rem] tracking-[0.04rem]">{name}</h3>
      <h4 class="inline text-[1.25rem] font-medium leading-[0.025rem]">
        / {subtitle}
      </h4>
    </div>
  </div>
</CollectionLayout>
