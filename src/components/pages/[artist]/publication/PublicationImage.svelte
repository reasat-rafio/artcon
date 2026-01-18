<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { cn } from '@/lib/cn';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityImageAssetDocument } from '@sanity/client';

  export let image: SanityImageAssetDocument;
  export let name: string;
  export let slideNext: (() => void) | undefined = undefined;
  export let slidePrev: (() => void) | undefined = undefined;
  export let isSinglePublication: boolean = false;
</script>

<section class={cn('mx-auto max-w-[69rem] ', $$props.class)}>
  <div
    class="flex items-center justify-center max-md:flex-col md:gap-x-[3.75rem]">
    {#if !isSinglePublication && slidePrev}
      <div class="hidden md:block">
        <button aria-label="Scroll to previous slide" on:click={slidePrev}>
          <ChevronLeftRounded />
        </button>
      </div>
    {/if}
    
    <div class="flex-1">
      <SanityImage
        class="h-auto max-h-[70vh] w-full object-contain "
        src={image}
        imageUrlBuilder={imageBuilder}
        alt={name}
        sizes="80vw" />
    </div>

    {#if !isSinglePublication && slideNext}
      <div class="mr-auto hidden md:block">
        <button aria-label="Scroll to next slide" on:click={slideNext}>
          <ChevronRightRounded />
        </button>
      </div>

      <div
        class="mt-[1.5rem] flex items-center justify-center gap-x-[0.62rem] md:hidden">
        <button aria-label="Scroll to previous slide" on:click={slidePrev}>
          <ChevronLeftRounded />
        </button>
        <button aria-label="Scroll to next slide" on:click={slideNext}>
          <ChevronRightRounded />
        </button>
      </div>
    {/if}
  </div>
</section>
