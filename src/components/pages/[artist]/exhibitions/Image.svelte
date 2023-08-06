<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import { createEventDispatcher } from 'svelte';

  export let image: SanityAsset;

  const dispatch = createEventDispatcher();
</script>

<div class="mb-[38px] flex items-center justify-center">
  <div>
    <SanityImage
      class="object-cover"
      sizes="50vw"
      src={image}
      imageUrlBuilder={imageBuilder}
    />
    <div class="my-[38px] flex space-x-[10px]">
      <button on:click={() => dispatch('scrollNext')}>
        <ChevronLeftRounded />
      </button>
      <button on:click={() => dispatch('scrollPrev')}>
        <ChevronRightRounded />
      </button>
    </div>
  </div>
</div>
