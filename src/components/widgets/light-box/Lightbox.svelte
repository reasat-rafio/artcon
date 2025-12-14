<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import { type EmblaCarouselType } from 'embla-carousel';
  import { scale, slide } from 'svelte/transition';
  import Slider from './Slider.svelte';
  import XIcon from '@/components/icons/X.svelte';
  import ThumbnailSlider from './ThumbnailSlider.svelte';
  import Backdrop from '@/components/common/Backdrop.svelte';
  import { cn } from '@/lib/cn';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';

  let sliderApi: EmblaCarouselType;
  let thumbnailSliderApi: EmblaCarouselType;
  let thumbnailSliderEl: HTMLDivElement;
  let canScrollPrev = false;
  let canScrollNext = true;
  $: activeIndex = $lightboxStore.activeIndex;

  function updateScrollState() {
    if (!sliderApi) return;
    canScrollNext = sliderApi.canScrollNext();
    canScrollPrev = sliderApi.canScrollPrev();
  }

  $: if (thumbnailSliderApi && sliderApi) {
    updateScrollState();
    sliderApi.on('select', () => {
      thumbnailSliderApi.scrollTo(sliderApi.selectedScrollSnap());
      activeIndex = sliderApi.selectedScrollSnap();
      updateScrollState();
    });
    thumbnailSliderApi.on('select', () => {
      sliderApi.scrollTo(thumbnailSliderApi.selectedScrollSnap());
    });
  }

  function closeLightbox() {
    lightboxStore.setLightboxVisibility(false);
  }

  const scrollPrev = () => sliderApi?.scrollPrev();
  const scrollNext = () => sliderApi?.scrollNext();
</script>

<Backdrop on:close={closeLightbox} />

<div
  in:scale={{ start: 0.92, delay: 200, duration: 300 }}
  out:scale={{ start: 0.92, delay: 0, duration: 300 }}
  class={cn(
    'fixed left-1/2 top-1/2 z-god -translate-x-1/2 -translate-y-1/2',
    'h-full max-h-screen w-full max-w-2xl overflow-y-auto',
    'flex flex-col gap-y-5 p-3 lg:p-5',
  )}>
  <Slider bind:sliderApi />
  {#if !$lightboxStore.hideThumbnails}
    <ThumbnailSlider
      bind:thumbnailSliderEl
      bind:sliderApi
      bind:thumbnailSliderApi
      {activeIndex} />
  {/if}
</div>

<button
  transition:scale
  on:click={closeLightbox}
  aria-label="Close lightbox"
  class="fixed right-5 top-2 z-god transition-transform hover:scale-110 lg:right-10 lg:top-5 p-2 lg:p-3 bg-black/40 rounded-full flex items-center justify-center">
  <XIcon class="h-5 w-5 text-white" />
</button>

<!-- Navigation Buttons -->
{#if !$lightboxStore.hideThumbnails}
  <button
    aria-label="Previous image"
    transition:slide={{ axis: 'x' }}
    on:click={scrollPrev}
    disabled={!canScrollPrev}
    class="fixed left-5 top-1/2 z-god -translate-y-1/2 transition-transform hover:scale-110 hover:enabled:scale-110 lg:left-10 p-2 lg:p-3 bg-black/40 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">
    <ChevronLeftRounded class="h-12 w-12 text-white drop-shadow-lg" />
  </button>

  <button
    aria-label="Next image"
    transition:slide={{ axis: 'x' }}
    on:click={scrollNext}
    disabled={!canScrollNext}
    class="fixed right-5 top-1/2 z-god -translate-y-1/2 transition-transform hover:scale-110 hover:enabled:scale-110 lg:right-10 p-2 lg:p-3 bg-black/40 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed">
    <ChevronRightRounded class="h-12 w-12 text-white drop-shadow-lg" />
  </button>
{/if}
