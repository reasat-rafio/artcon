<script lang="ts">
  import { cn } from '@/lib/cn';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

  export let anchors: string[];
  export let activeAnchor: string;
  export let activeAnchorIndex: number;

  let emblaApi: EmblaCarouselType;
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  $: if (emblaApi) {
    if (activeAnchorIndex !== -1) emblaApi.scrollTo(activeAnchorIndex);
  }

  const scrollToClickedAnchor = (anchor: string) => {
    const target = document.querySelector(`#${anchor}`) as HTMLElement;
    const artistNav = document.querySelector(
      '#artist-sorting-nav',
    ) as HTMLElement;

    if (target && artistNav) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: target.offsetTop + innerHeight,
      });
    }
  };
</script>

<aside class={cn('sticky top-5 z-10 mb-[2.5rem] hidden', $$props.class)}>
  <div
    class="mx-auto max-w-min cursor-grab overflow-hidden rounded-[2.68506rem] bg-cultured-gray py-[0.62rem] active:cursor-grabbing">
    <div
      class="relative overflow-hidden px-[calc(1.25rem/2)]"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        options: { skipSnaps: true, containScroll: 'trimSnaps' },
        plugins: [WheelGesturesPlugin()],
      }}>
      <div class="flex">
        {#each anchors as anchor}
          <button
            on:click={() => scrollToClickedAnchor(anchor)}
            class="mx-[calc(1.83rem/2)] flex-[0_0_auto] cursor-pointer text-center font-outfit text-[0.875rem] font-semibold leading-[150%] transition-colors duration-500 {anchor ===
            activeAnchor
              ? 'text-pigment-red'
              : 'text-quick-silver'}">
            {anchor}
          </button>
        {/each}
      </div>
    </div>
  </div>
</aside>
