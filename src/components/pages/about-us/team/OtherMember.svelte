<script lang="ts">
  import ChevronLeftRounded from '@/components/icons/ChevronLeftRounded.svelte';
  import ChevronRightRounded from '@/components/icons/ChevronRightRounded.svelte';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import { chunkArray } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { TeamProps } from '@/lib/types/about-us.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';

  export let extraTeam: TeamProps[];

  let emblaApi: EmblaCarouselType;
  let innerWidth = 0;
  let selectedSnap = 1;

  $: slidesNumber = innerWidth >= 1280 ? 6 : innerWidth >= 768 ? 4 : 2;
  $: chunksOfArtists = chunkArray(extraTeam, slidesNumber);
  $: if (emblaApi) {
    emblaApi.on('select', ({ selectedScrollSnap }: EmblaCarouselType) => {
      selectedSnap = selectedScrollSnap();
    });
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    selectedSnap = event.detail.selectedScrollSnap();
  };
</script>

<svelte:window bind:innerWidth />

<section use:parallaxAnimation class="translate-y-[120px]">
  <h3 class="head-4 mb-md">Other team members</h3>

  <div
    class="relative overflow-hidden"
    use:emblaCarouselSvelte={{ plugins: [], options: {} }}
    on:emblaInit={onInit}>
    <div class="flex">
      {#each chunksOfArtists as chunk}
        <div
          class="grid flex-[0_0_100%] grid-cols-1 gap-x-[3.56rem] gap-y-[3.12rem] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {#each chunk as { image, name, type, role, url }}
            <svelte:element
              this={url ? 'a' : 'div'}
              href={url}
              class="group flex h-fit items-center justify-center gap-x-[1.25rem]">
              <figure class="h-[7rem] w-[7rem] rounded-full overflow-hidden">
                <SanityImage
                  class="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-110"
                  src={image}
                  alt={name}
                  sizes="120px"
                  imageUrlBuilder={imageBuilder} />
              </figure>
              <div class="flex-1 space-y-[0.438rem]">
                <h4 class="haed-6">{name}</h4>
                <p class="head-8 font-optiberling-agency text-sonic-silver">
                  {role}
                </p>
              </div>
            </svelte:element>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="mt-[2.31rem] flex items-center justify-between">
    <nav>
      <div class="flex gap-x-[0.625rem]">
        <button
          aria-label="Scroll to previous slide"
          class="bg-white"
          on:click={() => emblaApi.scrollPrev()}>
          <ChevronLeftRounded />
        </button>
        <button
          aria-label="Scroll to next slide"
          on:click={() => emblaApi.scrollNext()}>
          <ChevronRightRounded />
        </button>
      </div>
    </nav>
    <span
      class="text-[0.75rem] font-light !leading-none tracking-[0.015rem] text-quartz-silver">
      {selectedSnap + 1}/{chunksOfArtists.length}
    </span>
  </div>
</section>
