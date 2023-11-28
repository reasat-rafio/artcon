<script lang="ts">
  import { chunkArray } from '@/lib/helper';
  import searchStore from '@/store/search';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Cards from '../vr/Cards.svelte';
  import ListContainer from './ListContainer.svelte';
  import LoadingWrapper from './LoadingWrapper.svelte';

  export let slidesNumber: number;

  let emblaApi: EmblaCarouselType;
  $: chunks = chunkArray($searchStore?.data?.vrs ?? [], slidesNumber);
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
  {carouselCanScrollNext}
  {carouselCanScrollPrev}
  title="Our virtual reality"
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
          <Cards class="flex-[0_0_100%] pl-[1.56rem]" items={chunk} />
        {/each}
      </LoadingWrapper>
    </div>
  </div>
</ListContainer>
