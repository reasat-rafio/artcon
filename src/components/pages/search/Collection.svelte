<script lang="ts">
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import ListContainer from './ListContainer.svelte';
  import Cards from '../collection/Cards.svelte';
  import searchStore from '@/store/search';
  import LoadingWrapper from './LoadingWrapper.svelte';

  export let slidesNumber: number;

  let emblaApi: EmblaCarouselType;
  $: chunks = chunkArray($searchStore?.data?.collections ?? [], slidesNumber);
  let carouselCanScrollNext: boolean = true;
  let carouselCanScrollPrev: boolean;
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
  title="Our Collections"
  showNav={chunks.length > 1}>
  <div
    class="!w-full overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { active: chunks.length > 1 },
    }}>
    <div class="ml-[-1.56rem] flex">
      <LoadingWrapper>
        {#each chunks as chunk}
          <div class="flex-[0_0_100%] pl-[1.56rem]">
            <Cards items={chunk} />
          </div>
        {/each}
      </LoadingWrapper>
    </div>
  </div>
</ListContainer>
