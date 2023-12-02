<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { OtherCollection } from '@/lib/types/collection-detail.types';

  export let data: OtherCollection[];
  export let title: string;

  $: data;
  let emblaApi: EmblaCarouselType;
  let sliderContainerEl: HTMLElement;
  let blockHeight = 0;
  let sliderItemDesEl: HTMLElement;
  let slideDescriptionBlockPositionFromTopOfTheContainer = 0;
  let activeSlideIndex = 0;

  onMount(() => {
    sliderItemDesEl = document.querySelector('.other-doc-info-container')!;
    getSliderDescriptionBlockPositionFromTopOfTheContainer();
  });

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSlideIndex = selectedScrollSnap();
    });
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const setBlockHeight = (node: HTMLElement, _: boolean) => {
    blockHeight = node.clientHeight;
    return {
      update(_: boolean) {
        blockHeight = node.clientHeight;
      },
    };
  };

  const getSliderDescriptionBlockPositionFromTopOfTheContainer = () => {
    if (!!sliderItemDesEl && !!sliderContainerEl) {
      const sliderItemDesElHeight = sliderItemDesEl.getBoundingClientRect().top;
      const containerTopPos = sliderContainerEl.getBoundingClientRect().top;
      slideDescriptionBlockPositionFromTopOfTheContainer =
        sliderItemDesElHeight - containerTopPos;
    }
  };
</script>

<svelte:window
  on:resize={getSliderDescriptionBlockPositionFromTopOfTheContainer} />

<section>
  <div
    class="container-primary border-t border-[#D2D2D3] pb-[7.79rem] pt-[4.375rem]">
    <h2 class="head-4 mb-[2rem]">{title}</h2>

    <div class="relative h-full xl:flex">
      <div class="flex-1" bind:this={sliderContainerEl}>
        <div
          class="relative overflow-hidden"
          on:emblaInit={onInit}
          use:emblaCarouselSvelte={{
            plugins: [],
            options: { align: 'start', loop: true, active: data.length > 1 },
          }}>
          <div class="-mr-[0.94rem] flex md:-mr-[1.88rem]">
            {#each data as { slug, name, asset, artist, media, year }, index}
              <a
                href="/collection/{slug.current}"
                class="flex-[0_0_90%] overflow-hidden xl:flex-[0_0_50%]">
                <div
                  class="relative mb-[1.25rem] mr-[0.94rem] aspect-square origin-left overflow-hidden rounded-lg transition-transform duration-500 md:mr-[1.88rem] xl:mb-[4.03rem] {activeSlideIndex !==
                  index
                    ? 'max-xl:scale-90'
                    : 'scale-100'}">
                  <Asset {asset} />
                </div>
                <div
                  class="other-doc-info-container origin-top border-[#D2D2D3] transition-transform duration-500 lg:pt-[2.25rem] xl:border-t {activeSlideIndex !==
                  index
                    ? 'max-xl:scale-75'
                    : 'scale-100'}">
                  <div
                    use:setBlockHeight={index === activeSlideIndex}
                    class="max-w-[95%] space-y-[0.625rem] lg:max-w-[25rem]">
                    <header>
                      <h3 class="inline text-head-6">
                        {artist?.name || name}
                      </h3>
                    </header>
                    <h4 class="text-head-8 text-[#77777C]">
                      {media} | {year}
                    </h4>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>

        <!-- ABSOLUTE POSITIONED SLIDES COUNTER FOR MOBILE -->
        <div
          style="top: calc({slideDescriptionBlockPositionFromTopOfTheContainer}px);"
          class="absolute right-0 block pt-[0.4rem] xl:hidden">
          <div class="sub-title-light bg-white text-[#4A4A51] md:pr-[2.25rem]">
            {#key activeSlideIndex}
              <span in:fade>
                {activeSlideIndex + 1}
              </span>
            {/key}
            /
            <span>{data.length}</span>
          </div>
        </div>
        <!-- END -->
      </div>

      {#if data?.length > 1}
        <!-- DESKTOP NAVIGATION -->
        <div
          style="height: {sliderContainerEl?.clientHeight}px; padding-top: calc({slideDescriptionBlockPositionFromTopOfTheContainer}px - 4.8rem);"
          class="hidden flex-col xl:flex">
          <div
            class="sub-title-light ml-auto bg-white pb-[3.9rem] pr-[2.56rem] text-[#4A4A51]">
            {#key activeSlideIndex}
              <span in:fade>
                {activeSlideIndex + 1}
              </span>
            {/key}
            /
            <span>{data.length}</span>
          </div>
          <nav
            class="ml-auto flex gap-x-[0.62rem] border-t border-[#D2D2D3] pl-[3.38rem] pt-[2.25rem]">
            <button on:click={() => emblaApi.scrollPrev()}>
              <ChevronLeftRounded />
            </button>
            <button on:click={() => emblaApi.scrollNext()}>
              <ChevronRightRounded />
            </button>
          </nav>
        </div>
        <!-- MOBILE NAVIGATION -->
        <nav
          class="mt-[2.5rem] flex items-center justify-center space-x-[0.62rem] xl:col-span-1 xl:hidden xl:flex-col">
          <button on:click={() => emblaApi.scrollPrev()}>
            <ChevronLeftRounded />
          </button>
          <button on:click={() => emblaApi.scrollNext()}>
            <ChevronRightRounded />
          </button>
        </nav>
      {/if}
    </div>
  </div>
</section>
