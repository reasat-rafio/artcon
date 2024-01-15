<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { cn } from '@/lib/cn';

  export let thumbnailSliderApi: EmblaCarouselType;
  export let sliderApi: EmblaCarouselType;
  export let activeIndex: number;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    thumbnailSliderApi = event.detail;
  };
</script>

<div class="max-h-[150px] min-h-[100px]">
  <div
    class="relative w-full flex-1 overflow-x-hidden overflow-y-visible"
    use:emblaCarouselSvelte={{
      options: {
        startIndex: $lightboxStore.activeIndex,
        align: 'start',
      },
      plugins: [],
    }}
    on:emblaInit={onInit}>
    <div class="flex h-full w-full gap-x-[1.25rem]">
      {#each $lightboxStore.allImages as img, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => {
            thumbnailSliderApi.scrollTo(index);
            sliderApi.scrollTo(index);
          }}
          class="relative flex h-full flex-[0_0_35%] outline-none md:flex-[0_0_25%] xl:flex-[0_0_15%]"
          role="button"
          tabindex="0">
          <SanityImage
            lqip
            class={cn(
              'h-fit w-full rounded-md border object-cover transition-[border] duration-200 ',
              index === activeIndex
                ? 'border-platinum/60'
                : 'border-transparent',
            )}
            sizes="100vw"
            src={img}
            imageUrlBuilder={imageBuilder}
            alt={img.alt} />
        </div>
      {/each}
    </div>
  </div>
</div>
