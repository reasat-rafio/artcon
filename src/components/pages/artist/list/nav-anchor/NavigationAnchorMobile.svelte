<script lang="ts">
  import { cn } from '@/lib/cn';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

  export let anchors: string[];
  export let activeAnchor: string;
  export let activeAnchorIndex: number;

  // let alphabet: string[] = [];
  // for (let i = 0; i < 26; i++) {
  //   alphabet.push(String.fromCharCode(65 + i)); // Uppercase letters
  // }

  let emblaApi: EmblaCarouselType;
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  $: if (emblaApi) {
    if (activeAnchorIndex !== -1) emblaApi.scrollTo(activeAnchorIndex);
  }
</script>

<aside class={cn('sticky top-5 z-10 mb-[2.5rem] hidden', $$props.class)}>
  <div
    class="mx-auto max-w-min cursor-grab overflow-hidden rounded-[2.68506rem] bg-[#F8F8F8] py-[0.62rem] active:cursor-grabbing">
    <div
      class="relative overflow-hidden px-[1.25rem]"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        options: { skipSnaps: true, containScroll: 'trimSnaps' },
        plugins: [WheelGesturesPlugin()],
      }}>
      <div class="flex">
        {#each anchors as anchor}
          <a
            href="#{anchor}"
            class="mr-[1.83rem] flex-[0_0_auto] cursor-pointer text-center font-outfit text-[0.875rem] font-semibold leading-[150%] transition-colors duration-500 {anchor ===
            activeAnchor
              ? 'text-[#ED1C24]'
              : 'text-[#A5A5A8]'}">
            {anchor}
          </a>
        {/each}
      </div>
    </div>
  </div>
</aside>
