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
    class="absolute bottom-0 left-0 z-10 text-white transition-transform duration-500 ease-out group-hover:translate-y-[-0.8rem] max-lg:px-[1.25rem] max-lg:pb-[2.8rem] lg:p-[3rem] xl:w-[90%] xl:p-[4rem]"
  >
    <h2 class="text-[1.125rem] font-medium">{title}</h2>
    <div class="pt-[0.75rem]">
      <h3 class="inline text-[2.5rem] leading-[1.2]">{name}</h3>
      <h4 class="inline text-[1.125rem] font-medium leading-[0.025rem]">
        / {subtitle}
      </h4>
    </div>
  </div>
</CollectionLayout>
