<script lang="ts">
  import { cn } from '@/lib/cn';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

  export let anchors: string[];
  export let activeAnchor: string;

  const alphabet: string[] = [];
  let emblaApi: EmblaCarouselType;

  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(65 + i)); // Uppercase letters
  }

  $: {
    console.log(activeAnchor);
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<aside
  class={cn(
    'sticky top-0 hidden h-screen items-center justify-center lg:flex',
    $$props.class,
  )}>
  <div
    class="max-h-[70vh] cursor-grab overflow-hidden rounded-[2.29rem] bg-[#F8F8F8] py-[2.73875rem] active:cursor-grabbing xl:max-h-[47.9rem]">
    <div
      class="relative h-full overflow-hidden px-[0.8055rem]"
      on:emblaInit={onInit}
      use:emblaCarouselSvelte={{
        options: { axis: 'y', skipSnaps: true, containScroll: 'trimSnaps' },
        plugins: [WheelGesturesPlugin()],
      }}>
      <div class="flex h-full flex-col">
        {#each anchors as anchor}
          <a
            href="#{anchor}"
            class="mb-[1.83rem] flex-[0_0_auto] cursor-pointer text-center font-outfit text-[0.875rem] font-semibold leading-[150%] transition-colors duration-500 {anchor ===
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
