<script lang="ts">
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import Gallery from './Gallery.svelte';
  import { twMerge } from 'tailwind-merge';

  export let plugins: EmblaPluginType[] = [];
  export let options: Partial<EmblaOptionsType> = {};

  let emblaApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<div
  class={twMerge('overflow-hidden', $$props.class)}
  use:emblaCarouselSvelte={{ plugins, options }}
  on:emblaInit={onInit}
>
  <div class="flex">
    <slot {Gallery} api={emblaApi} />
  </div>
</div>
