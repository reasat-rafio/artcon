<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { cn } from '@/lib/cn';
  import { type EmblaCarouselType } from 'embla-carousel';

  export let thumbnailSliderApi: EmblaCarouselType;
  export let thumbnailSliderEl: HTMLDivElement;
  export let sliderApi: EmblaCarouselType;
  export let activeIndex: number;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    thumbnailSliderApi = event.detail;
  };
</script>

<div
  bind:this={thumbnailSliderEl}
  class="h-fit max-h-[9.375rem] min-h-[6.25rem]">
  <div
    class="relative h-full w-full flex-1 overflow-hidden"
    use:emblaCarouselSvelte={{
      options: {
        startIndex: $lightboxStore.activeIndex,
        align: 'start',
        skipSnaps: true,
      },
      plugins: [],
    }}
    on:emblaInit={onInit}>
    <div class="flex h-full w-full gap-x-[1.25rem]">
      {#each $lightboxStore.allImages as img, index}
        <button
          on:click={() => {
            thumbnailSliderApi.scrollTo(index);
            sliderApi.scrollTo(index);
          }}
          class="relative flex h-full w-full flex-[0_0_35%] overflow-hidden rounded-md outline-none md:flex-[0_0_25%] xl:flex-[0_0_15%]">
          <SanityImage
            lqip
            class={cn(
              'h-full w-full object-cover transition-all duration-300 hover:scale-105',
              index === activeIndex ? 'grayscale' : '',
            )}
            sizes="(min-width: 1024px) 15vw, (min-width: 768px) 25vw, 35vw"
            src={img}
            imageUrlBuilder={imageBuilder}
            alt={img.alt} />
        </button>
      {/each}
    </div>
  </div>
</div>
