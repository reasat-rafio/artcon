<script lang="ts">
  import lightboxStore from '@/store/lightbox';
  import { type EmblaCarouselType } from 'embla-carousel';
  import { scale } from 'svelte/transition';
  import Slider from './Slider.svelte';
  import XIcon from '@/components/icons/X.svelte';
  import ThumbnailSlider from './ThumbnailSlider.svelte';
  import { onMount } from 'svelte';
  import Backdrop from '@/components/common/Backdrop.svelte';
  import { cn } from '@/lib/cn';

  let sliderApi: EmblaCarouselType;
  let thumbnailSliderApi: EmblaCarouselType;
  let thumbnailSliderEl: HTMLDivElement;
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

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') closeLightbox();
  }
  onMount(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function closeLightbox() {
    lightboxStore.setLightboxVisibility(false);
  }
</script>

<Backdrop class="bg-black-800/70" on:close={closeLightbox} />

<div
  in:scale={{ delay: 200, duration: 300 }}
  out:scale={{ start: 0.8, delay: 0, duration: 300 }}
  class={cn(
    'fixed left-1/2 top-1/2 z-god -translate-x-1/2 -translate-y-1/2',
    'h-full max-h-screen w-full max-w-2xl overflow-y-auto',
    'flex flex-col gap-y-5 p-3 lg:p-5',
  )}>
  <Slider bind:sliderApi />
  <ThumbnailSlider
    bind:thumbnailSliderEl
    bind:sliderApi
    bind:thumbnailSliderApi
    {activeIndex} />
</div>

<button
  transition:scale
  on:click={closeLightbox}
  class="fixed right-2 top-2 z-god transition-transform hover:scale-110 lg:right-5 lg:top-5">
  <XIcon class="h-5 w-5" />
</button>
