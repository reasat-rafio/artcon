<script lang="ts">
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import ListContainer from './ListContainer.svelte';
  import Cards from '../project/Cards.svelte';
  import searchStore from '@/store/search';

  export let slidesNumber: number;

  let emblaApi: EmblaCarouselType;
  $: chunks = chunkArray($searchStore?.data?.projects ?? [], slidesNumber);

  const scrollNext = () => emblaApi.scrollNext();
  const scrollPrev = () => emblaApi.scrollPrev();
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<ListContainer
  {scrollNext}
  {scrollPrev}
  title="Our projects"
  showNav={chunks.length > 1}>
  <div
    class="!w-full overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { active: chunks.length > 1 },
    }}>
    <div class="ml-[-1.56rem] flex">
      {#each chunks as chunk}
        <Cards class="flex-[0_0_100%] pl-[1.56rem]" items={chunk} />
      {/each}
    </div>
  </div>
</ListContainer>
