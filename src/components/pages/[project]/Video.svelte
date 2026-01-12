<script lang="ts">
  import VR from '@/components/common/Vr.svelte';
  import Youtube from '@/components/common/Youtube.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import type { VideoProps } from '@/lib/types/project-detail.types';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { onDestroy } from 'svelte';

  export let props: VideoProps;
  $: ({ vrOrYtVideoSlider } = props);

  let emblaApi: EmblaCarouselType;
  let autoplayInstance: any;
  let hasStartedMoving = false;
  
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    autoplayInstance = emblaApi.plugins()?.autoplay;
    
    emblaApi.on('select', () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      
      if (currentIndex !== 0 && !hasStartedMoving) {
        hasStartedMoving = true;
      }
      
      if (currentIndex === 0 && hasStartedMoving) {
        autoplayInstance?.stop();
      }
    });
  };

  $: carouselOptions = {
    watchDrag: false,
    loop: vrOrYtVideoSlider && vrOrYtVideoSlider.length > 1,
    plugins: vrOrYtVideoSlider && vrOrYtVideoSlider.length > 1 
      ? [Autoplay({ delay: 4000, stopOnInteraction: false, jump: false })]
      : []
  };

  onDestroy(() => {
    autoplayInstance?.stop();
  });
</script>

{#if !!vrOrYtVideoSlider?.length}
  <section>
  <div class="pt-section container-primary pb-sm md:pb-[4.94rem] {$$props.class}">
      <div
        class="relative overflow-hidden"
        use:emblaCarouselSvelte={{ plugins: carouselOptions.plugins, options: carouselOptions }}
        on:emblaInit={onInit}>
        <div class="-ml-[1.25rem] flex">
          {#each vrOrYtVideoSlider as props}
            <div class="flex-[0_0_100%] pl-[1.25rem]">
              {#if props._type === 'vr'}
                <VR vr={props} />
              {:else if props._type === 'youtube'}
                <Youtube yt={props} />
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <div
        class="mx-auto flex max-w-[72.9375rem] translate-y-[20px] justify-center md:justify-end mt-[1rem] md:mt-0">
        <nav class="flex gap-x-[0.62rem]">
          <button
            aria-label="Scroll to previous slide"
            on:click={() => emblaApi.scrollPrev()}>
            <ChevronLeftRounded />
          </button>
          <button
            aria-label="Scroll to next slide"
            on:click={() => emblaApi.scrollNext()}>
            <ChevronRightRounded />
          </button>
        </nav>
      </div>
    </div>
  </section>
{/if}
