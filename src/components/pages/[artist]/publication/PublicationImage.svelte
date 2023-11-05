<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { twMerge } from 'tailwind-merge';

  export let image: SanityImageAssetDocument;
  export let name: string;
  export let slideNext: () => void;
  export let slidePrev: () => void;
</script>

<section class={twMerge('', $$props.class)}>
  <div class="ml-auto grid grid-cols-12 items-center justify-center">
    <div class="col-span-1 ml-auto hidden md:block">
      <button class="" on:click={slidePrev}>
        <ChevronLeftRounded />
      </button>
    </div>
    <div class="col-span-12 md:col-span-10 md:px-[3.75rem]">
      <SanityImage
        class="h-auto max-h-[55.83069rem] w-full object-contain "
        src={image}
        imageUrlBuilder={imageBuilder}
        alt={name}
        sizes="80vw"
      />
    </div>
    <div class="col-span-1 mr-auto hidden md:block">
      <button class="" on:click={slideNext}>
        <ChevronRightRounded />
      </button>
    </div>

    <div
      class="col-span-12 mt-[1.5rem] flex items-center justify-center gap-x-[0.62rem] md:hidden"
    >
      <button class="" on:click={slideNext}>
        <ChevronLeftRounded />
      </button>
      <button class="" on:click={slideNext}>
        <ChevronRightRounded />
      </button>
    </div>
  </div>
</section>
