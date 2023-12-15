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
  let innerHeight = 0;
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
        top: target.offsetTop + innerHeight - artistNav.clientHeight,
      });
    }
  };
</script>

<svelte:window bind:innerHeight />
<aside
  class={cn(
    'sticky top-0 h-screen items-center justify-center',
    $$props.class,
  )}>
  <div
    class="max-h-[70vh] cursor-grab overflow-hidden rounded-[2.29rem] bg-[#F8F8F8] py-[calc(2.73875rem/2)] active:cursor-grabbing xl:max-h-[47.9rem]">
    <div
      class="relative h-full overflow-hidden px-[0.8055rem]"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        options: { axis: 'y', skipSnaps: true, containScroll: 'trimSnaps' },
        plugins: [WheelGesturesPlugin()],
      }}>
      <div class="flex h-full flex-col">
        {#each anchors as anchor}
          <button
            on:click={() => scrollToClickedAnchor(anchor)}
            class="my-[calc(1.83rem/2)] flex-[0_0_auto] cursor-pointer text-center font-outfit text-[0.875rem] font-semibold leading-[150%] transition-colors duration-500 {anchor ===
            activeAnchor
              ? 'text-[#ED1C24]'
              : 'text-[#A5A5A8]'}">
            {anchor}
          </button>
        {/each}
      </div>
    </div>
  </div>
</aside>
