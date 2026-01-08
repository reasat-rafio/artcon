<script lang="ts">
  import Asset from '@/components/common/hero/Asset.svelte';
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { CommonOtherExhibitionProps } from '@/lib/types/common.types';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { slide } from 'svelte/transition';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let data: CommonOtherExhibitionProps[];
  export let title: string;
  export let urlPrefix: string;

  let emblaApi: EmblaCarouselType;
  let carouselCanScrollPrev: boolean = false;
  let carouselCanScrollNext: boolean = false;
  const STATUS_ORDER = {
    Ongoing: 0,
    Upcoming: 1,
    Ended: 2,
  } as const;

  $: if (emblaApi) {
    emblaApi.on('select', ({ canScrollNext, canScrollPrev }: EmblaCarouselType) => {
      carouselCanScrollNext = canScrollNext();
      carouselCanScrollPrev = canScrollPrev();
    });
    emblaApi.on('resize', ({ canScrollNext, canScrollPrev }: EmblaCarouselType) => {
      carouselCanScrollNext = canScrollNext();
      carouselCanScrollPrev = canScrollPrev();
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

    return STATUS_ORDER[statusA] - STATUS_ORDER[statusB];
  });

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    carouselCanScrollNext = event.detail.canScrollNext();
    carouselCanScrollPrev = event.detail.canScrollPrev();
  };
</script>

<section>
  <div
    class="container-primary border-t border-light-gray/40 pb-[5.84rem] pt-[3.28rem]">
    <div class="mb-[2rem] flex items-center justify-between">
      <h2 class="head-4">{title}</h2>
      <span class="sub-title-light text-quartz-silver">1/{data.length}</span>
    </div>

    <div class="relative">
      <div class="overflow-hidden">
        <div
          on:emblaInit={onInit}
          use:emblaCarouselSvelte={{
            plugins: [],
            options: { align: 'start', loop: false },
          }}>
          <div class="-ml-[1.563rem] flex">
            {#each data as { slug, type, name, asset, tag, subtitle, startDate, endDate, documentationImages, invitationCardImage }}
              {@const isUpcoming = calculateStatusBetweenDates({ startDate, endDate }).status === 'Upcoming'}
              {@const displayImage = isUpcoming 
                ? (urlPrefix === '/exhibition' ? invitationCardImage : documentationImages?.[0]) 
                : null}
              <a
                href="{urlPrefix}/{slug.current}"
                class="flex-[0_0_100%] pl-[1.563rem] md:flex-[0_0_50%] xl:flex-[0_0_33.333%]">
                <div class="relative mb-[1.25rem] overflow-hidden rounded-[0.75rem]" 
                     class:aspect-square={!displayImage}
                     style={displayImage ? 'aspect-ratio: 3/4' : ''}>
                  {#if displayImage}
                    <SanityImage
                      lqip
                      class="h-full w-full object-contain"
                      sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                      alt={displayImage.alt || 'Invitation Card'}
                      src={displayImage}
                      imageUrlBuilder={imageBuilder} />
                  {:else}
                    <Asset {asset} />
                  {/if}
                </div>

                <div class="space-y-[0.625rem]">
                  <header>
                    <h3 class="head-6 inline">{name}</h3>
                    {#if !!subtitle}
                      <span class="head-8"> / </span>
                      <h4 class="head-8 inline">{subtitle}</h4>
                    {:else if !!type}
                      <span class="head-8"> / </span>
                      <h4 class="head-8 inline">
                        {#if typeof type === 'string'}
                          {type}
                        {:else}
                          {type.name}
                        {/if}
                      </h4>
                    {/if}
                  </header>
                  <h4 class="head-8 text-sonic-silver">
                    {tag.name}
                  </h4>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>

      <nav
        class="mt-[2.38rem] flex items-center justify-center gap-x-[0.62rem] lg:mt-[1.57rem] lg:justify-end">
        <button
          aria-label="Scroll to previous slide"
          disabled={!carouselCanScrollPrev}
          class:opacity-50={!carouselCanScrollPrev}
          class:cursor-not-allowed={!carouselCanScrollPrev}
          on:click={() => emblaApi.scrollPrev()}>
          <ChevronLeftRounded />
        </button>
        <button
          aria-label="Scroll to next slide"
          disabled={!carouselCanScrollNext}
          class:opacity-50={!carouselCanScrollNext}
          class:cursor-not-allowed={!carouselCanScrollNext}
          on:click={() => emblaApi.scrollNext()}>
          <ChevronRightRounded />
        </button>
      </nav>
    </div>
  </div>
</section>
