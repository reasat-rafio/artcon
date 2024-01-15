<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import { type EmblaCarouselType } from 'embla-carousel-svelte';
  import { blur, fade, scale } from 'svelte/transition';
  import Slider from './Slider.svelte';
  import XIcon from '@/components/icons/X.svelte';
  import ThumbnailSlider from './ThumbnailSlider.svelte';

  let sliderApi: EmblaCarouselType;
  let thumbnailSliderApi: EmblaCarouselType;
  $: activeIndex = $lightboxStore.activeIndex;

  $: if (thumbnailSliderApi && sliderApi) {
    sliderApi.on('select', () => {
      thumbnailSliderApi.scrollTo(sliderApi.selectedScrollSnap());
      activeIndex = sliderApi.selectedScrollSnap();
    });
    thumbnailSliderApi.on('select', () => {
      sliderApi.scrollTo(thumbnailSliderApi.selectedScrollSnap());
    });
  }

  function closeLightbox() {
    lightboxStore.setLightboxVisibility(false);
  }
</script>

<div
  tabindex="0"
  role="button"
  aria-label="backdrop"
  on:click={closeLightbox}
  on:keypress={closeLightbox}
  class="fixed inset-0 z-demigod h-full w-full cursor-default bg-black-800/50 backdrop-blur-xl"
  transition:fade />

<button
  transition:scale
  on:click={closeLightbox}
  class="fixed right-5 top-5 z-god transition-transform hover:scale-110">
  <XIcon class="h-5 w-5" />
</button>

<div
  in:scale={{ delay: 200, duration: 300 }}
  out:scale={{ start: 0.8, delay: 0, duration: 300 }}
  class="fixed left-1/2 top-1/2 z-god flex h-full w-full max-w-screen-xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto max-lg:px-5">
  <Slider bind:sliderApi />
  <ThumbnailSlider bind:sliderApi bind:thumbnailSliderApi {activeIndex} />
</div>
