<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import { blur, fade, scale } from 'svelte/transition';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';

  let emblaApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<div
  tabindex="0"
  role="button"
  aria-label="backdrop"
  on:click={() => lightboxStore.setLightboxVisibility(false)}
  on:keypress={() => lightboxStore.setLightboxVisibility(false)}
  class="fixed inset-0 z-demigod h-full w-full cursor-default bg-black-800/50 backdrop-blur-xl"
  transition:fade />

<div
  in:scale={{ delay: 200, duration: 300 }}
  out:blur
  class="fixed left-1/2 top-1/2 z-god h-fit w-full max-w-screen-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-lg:px-5">
  <div
    class="relative h-full w-full overflow-hidden"
    use:emblaCarouselSvelte={{
      options: {
        startIndex: $lightboxStore.activeIndex,
      },
      plugins: [],
    }}
    on:emblaInit={onInit}>
    <div class="ml-[-1.25rem] flex h-full w-full">
      {#each $lightboxStore.allImages as img}
        <div class="relative flex h-full flex-[0_0_100%] pl-[1.25rem]">
          <SanityImage
            class="h-full w-full rounded-[25px] object-cover"
            sizes="100vw"
            src={img}
            imageUrlBuilder={imageBuilder}
            alt={img.alt} />
        </div>
      {/each}
    </div>
  </div>
</div>
