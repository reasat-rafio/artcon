<script lang="ts">
  import type { ExhibitionProps, WithExtra } from '@/lib/types/landing.types';
  import { goto } from '$app/navigation';
  import uiStore from '@/store/ui';
  import { delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { slide } from 'svelte/transition';
  import H8 from '@/components/ui/H8.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import H3 from '@/components/ui/H3.svelte';

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
  $: width = DEFAULT_COLUMN_W_PERCENTAGE;

  const onClickAction = async () => {
    uiStore.setActivePreview(index);
    await delay(600);
    goto(`/preview/exhibition/${slug.current}`);
  };

  //   const checkGroupexhibitionType = (
  //     data: ExhibitionProps['exhibitionType'],
  //   ) => {
  //     if ('en' in data) {
  //       return true;
  //     }
  //   };
</script>

<a
  data-sveltekit-preload-data
  style="width: {width}vw;"
  href="/preview/exhibition/{slug.current}"
  class="pointer-events-auto relative h-screen"
  on:click|preventDefault={onClickAction}
>
  <SanityImage
    class="h-full w-full object-cover"
    src={previewDisplayImage}
    sizes="30vw"
    imageUrlBuilder={imageBuilder}
    alt={name}
  />
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
</a>

{#if index === $uiStore.seclectedPreviewIndex}
  <div
    in:slide={{ axis: 'x', duration: 500 }}
    out:slide={{ axis: 'x', duration: 600 }}
    style="width: {100 - DEFAULT_COLUMN_W_PERCENTAGE}vw;"
    class="bg-white"
  />
{/if}
