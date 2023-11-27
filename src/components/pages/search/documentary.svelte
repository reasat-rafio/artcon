<script lang="ts">
  import { chunkArray } from '@/lib/helper';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import ListContainer from './ListContainer.svelte';
  import Cards from '../documentary/Cards.svelte';
  import type { Documentary } from '@/lib/types/documentary.types';

  export let documentaries: Documentary[];

  let innerWidth = 0;
  let emblaApi: EmblaCarouselType;
  $: chunks = chunkArray(documentaries, slidesNumber);
  $: slidesNumber =
    innerWidth >= 1536 ? 6 : innerWidth >= 1280 ? 4 : innerWidth >= 768 ? 2 : 1;

  const scrollNext = () => emblaApi.scrollNext();
  const scrollPrev = () => emblaApi.scrollPrev();
  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };
</script>

<svelte:window bind:innerWidth />
<ListContainer
  {scrollNext}
  {scrollPrev}
  title="Our documentaries"
  showNav={chunks.length > 1}>
  <div
    class="!w-full overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { active: chunks.length > 1 },
    }}>
    <div class="flex md:ml-[-1.56rem]">
      {#each chunks as chunk}
        <Cards class="flex-[0_0_100%] pl-[1.56rem]" items={chunk} />
      {/each}
    </div>
  </div>
</ListContainer>
