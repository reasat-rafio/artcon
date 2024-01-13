<script lang="ts">
  import { cn } from '@/lib/cn';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';

  export let plugins: EmblaPluginType[] = [];
  export let options: Partial<EmblaOptionsType> = {};

  let emblaApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<div
  class={cn('overflow-hidden', $$props.class)}
  use:emblaCarouselSvelte={{ plugins, options }}
  on:emblaInit={onInit}>
  <div class="flex">
    <slot api={emblaApi} />
  </div>
</div>
