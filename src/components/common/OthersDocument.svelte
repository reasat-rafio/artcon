<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { CommonOtherExhibitionProps } from '@/lib/types/common.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import { twMerge } from 'tailwind-merge';

  export let data: CommonOtherExhibitionProps[];
  export let title: string;
  $: data;

  let emblaApi: EmblaCarouselType;
  let activeSlideIndex = 0;
  let blockHeight = 0;
  const statusOrder = {
    Ongoing: 0,
    Upcoming: 1,
    Ended: 2,
  } as const;

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

  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }) => {
      activeSlideIndex = selectedScrollSnap();
    });
  }

  const setBlockHeight = (node: HTMLElement, isActive: boolean) => {
    blockHeight = node.clientHeight;
    return {
      update(isActive: boolean) {
        blockHeight = node.clientHeight;
      },
    };
  };
</script>

<section>
  <div class="px-section py-section max-w-section border-t border-[#BBBBBE]">
    <h2 class="head-xl">{title}</h2>
    <div class="relative">
      <div
        class="relative mt-[32px] overflow-hidden"
        use:emblaCarouselSvelte={{ plugins: [], options: { align: 'start' } }}
        on:emblaInit={onInit}
      >
        <div class="flex">
          {#each data as { slug, type, name, asset, tag }, index}
            <a
              href="/exhibition/{slug.current}"
              class="flex-[0_0_90%] overflow-hidden md:flex-[0_0_70%] xl:flex-[0_0_50%]"
            >
              <div
                class="relative mb-[1.25rem] aspect-square overflow-hidden rounded-lg odd:mr-[0.94rem] even:ml-[94rem] lg:mb-[4.03rem] odd:lg:mr-[1.81rem] even:lg:ml-[1.81rem]"
              >
                <Asset {asset} />
              </div>
              <div
                class={twMerge('border-[#D2D2D3] lg:border-t lg:pt-[2.25rem]')}
              >
                <div
                  use:setBlockHeight={index === activeSlideIndex}
                  class={twMerge(
                    'space-y-[10px] transition-transform duration-300 odd:lg:mr-[1.81rem] even:lg:ml-[1.81rem]',
                    index === activeSlideIndex &&
                      'lg:translate-x-[23%] lg:pr-[23%] 2xl:translate-x-[20%] 2xl:pr-[20%]',
                  )}
                >
                  <header>
                    <h3 class="inline text-head-6">{name}</h3>
                    {#if !!type}
                      <h4 class="inline text-head-8">
                        /
                        {#if typeof type === 'string'}
                          {type}
                        {:else}
                          {type.name}
                        {/if}
                      </h4>
                    {/if}
                  </header>
                  <h4 class="text-head-8 text-[#77777C]">
                    {tag.name}
                  </h4>
                </div>
              </div>
            </a>
          {/each}
        </div>
        <div
          id="navContainer"
          style="--blockHeight:{blockHeight}px"
          class="z-10 space-x-[0.62rem] bg-white max-lg:mt-[2.38rem] max-lg:flex max-lg:justify-center lg:absolute lg:left-0 lg:space-x-[0.3rem]"
        >
          <button on:click={() => emblaApi.scrollPrev()}>
            <ChevronLeftRounded />
          </button>
          <button on:click={() => emblaApi.scrollNext()}>
            <ChevronRightRounded />
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @media screen and (min-width: 1024px) {
    #navContainer {
      bottom: calc(var(--blockHeight) / 2);
    }
  }
</style>
