<script lang="ts">
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import ListContainer from '../ListContainer.svelte';
  import searchStore from '@/store/search';
  import LoadingWrapper from '../LoadingWrapper.svelte';
  import Card from './Card.svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import type { Artist } from '@/lib/types/artist.types';

  let emblaApi: EmblaCarouselType;

  let carouselCanScrollNext: boolean = true;
  let carouselCanScrollPrev: boolean;
  $: artists = $searchStore?.data?.artists as Artist[];
  $: if (emblaApi) {
    emblaApi.on('select', ({ canScrollNext, canScrollPrev }) => {
      carouselCanScrollNext = canScrollNext();
      carouselCanScrollPrev = canScrollPrev();
    });
  }

  const scrollNext = () => emblaApi.scrollNext();
  const scrollPrev = () => emblaApi.scrollPrev();
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<ListContainer
  {scrollNext}
  {scrollPrev}
  {carouselCanScrollPrev}
  {carouselCanScrollNext}
  title="Our Artists"
  showNav={artists?.length > 1}>
  <div
    class="h-full !w-full overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { active: artists?.length > 1 },
    }}>
    <div class="flex gap-x-[1.56rem]">
      <LoadingWrapper>
        {#each artists as artist (artist._id)}
          <div
            class="h-full flex-[0_0_100%]"
            animate:flip={{ duration: 500 }}
            in:fade>
            <Card {artist} />
          </div>
        {/each}
      </LoadingWrapper>
    </div>
  </div>
</ListContainer>
