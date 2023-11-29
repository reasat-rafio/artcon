<script lang="ts">
  import { cn } from '@/lib/cn';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

  export let anchors: string[];
  export let activeAnchor: string;
  export let activeAnchorIndex: number;

  const alphabet: string[] = [];
  let emblaApi: EmblaCarouselType;

  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(65 + i)); // Uppercase letters
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  // $: if (emblaApi) {
  //   emblaApi.on('scroll', (emblaApi) => {
  //     const {
  //       limit,
  //       target,
  //       location,
  //       offsetLocation,
  //       scrollTo,
  //       translate,
  //       scrollBody,
  //     } = emblaApi.internalEngine();

  //     let edge: number | null = null;

  //     if (limit.reachedMax(location.get())) edge = limit.max;
  //     if (limit.reachedMin(location.get())) edge = limit.min;

  //     if (edge !== null) {
  //       offsetLocation.set(edge);
  //       location.set(edge);
  //       target.set(edge);
  //       translate.to(edge);
  //       translate.toggleActive(false);
  //       scrollBody.useDuration(0).useFriction(0);
  //       scrollTo.distance(0, false);
  //     } else {
  //       translate.toggleActive(true);
  //     }
  //   });
  // }
</script>

<aside
  class={cn(
    'sticky top-0 flex h-screen items-center justify-center',
    $$props.class,
  )}>
  <div
    class="h-[70vh] cursor-grab overflow-hidden rounded-[2.29rem] bg-[#F8F8F8] py-[2.73875rem] active:cursor-grabbing">
    <div
      class="relative h-full overflow-hidden px-[0.8055rem]"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        options: { axis: 'y', skipSnaps: true, containScroll: 'trimSnaps' },
        plugins: [WheelGesturesPlugin()],
      }}>
      <div
        style="height: calc((100% - (2.73875rem * 2)) / 12);"
        class="flex flex-col">
        {#each alphabet as anchor}
          <button
            class="font-outfit flex-[0_0_100%] cursor-pointer text-center text-[0.875rem] font-semibold leading-[150%] transition-colors duration-500 {anchor ===
            activeAnchor
              ? 'text-[#967d7e]'
              : 'text-[#A5A5A8]'}">
            {anchor}
          </button>
        {/each}
      </div>
    </div>
  </div>
</aside>
