<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { CommonOtherExhibitionProps } from '@/lib/types/common.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let data: CommonOtherExhibitionProps[];
  export let title: string;
  export let urlPrefix: string;

  $: data;
  let emblaApi: EmblaCarouselType;
  let sliderContainerEl: HTMLElement;
  let activeSlideIndex = 0;
  let blockHeight = 0;
  const statusOrder = {
    Ongoing: 0,
    Upcoming: 1,
    Ended: 2,
  } as const;

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSlideIndex = selectedScrollSnap();
    });
  }

  data.sort((a, b) => {
    const { status: statusA } = calculateStatusBetweenDates({
      startDate: a.startDate,
      endDate: a.endDate,
    });

    const { status: statusB } = calculateStatusBetweenDates({
      startDate: b.startDate,
      endDate: b.endDate,
    });

    return statusOrder[statusA] - statusOrder[statusB];
  });
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

  let slideCounterPos = 0;
  onMount(() => {
    const sliderItemDesEl = document.querySelector(
      '.other-doc-info-container',
    )!;
    const sliderItemDesElHeight = sliderItemDesEl.getBoundingClientRect().top;
    const containerTopPos = sliderContainerEl.getBoundingClientRect().top;
    slideCounterPos = sliderItemDesElHeight - containerTopPos;
  });
</script>

<section>
  <div
    class="container-primary border-t border-[#BBBBBE] pb-[7.79rem] pt-[4.375rem]">
    <h2 class="head-4 mb-[2rem]">{title}</h2>
    <div bind:this={sliderContainerEl} class="relative">
      <div
        class="relative mx-[4.87rem] overflow-hidden"
        on:emblaInit={onInit}
        use:emblaCarouselSvelte={{
          plugins: [],
          options: { align: 'start', loop: true },
        }}>
        <div class="flex">
          {#each data as { slug, type, name, asset, tag }, index}
            <a
              href="{urlPrefix}/{slug.current}"
              class="flex-[0_0_90%] overflow-hidden md:flex-[0_0_70%] xl:flex-[0_0_50%]">
              <div
                class="relative mb-[4.03rem] mr-[1.81rem] aspect-square overflow-hidden rounded-lg">
                <Asset {asset} />
              </div>
              <div
                class="other-doc-info-container border-[#D2D2D3] pl-[1.88rem] lg:border-t lg:pt-[2.25rem]">
                <div
                  use:setBlockHeight={index === activeSlideIndex}
                  class="max-w-[25rem] space-y-[0.625rem]">
                  <header>
                    <h3 class="head-6 inline">{name}</h3>
                    {#if !!type}
                      <h4 class="head-8 inline">
                        /
                        {#if typeof type === 'string'}
                          {type}
                        {:else}
                          {type.name}
                        {/if}
                      </h4>
                    {/if}
                  </header>
                  <h4 class="head-8 text-[#77777C]">
                    {tag.name}
                  </h4>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>

      <div
        style="top: {slideCounterPos}px;"
        class="absolute right-0 mr-[calc(1.81rem+4.87rem)] pt-[2.25rem]">
        <div class="sub-title-light bg-white text-[#4A4A51]">
          {#key activeSlideIndex}
            <span in:fade out:fade={{ duration: 0 }}>
              {activeSlideIndex + 1}
            </span>
          {/key}
          /
          <span>{data.length}</span>
        </div>
      </div>
    </div>
  </div>
</section>
