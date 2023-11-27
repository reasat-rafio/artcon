<script lang="ts">
  import Card from '@/components/ui/card/Card.svelte';
  import { chunkArray } from '@/lib/helper';
  import type { Exhibition } from '@/lib/types/exhibition.types';
  import type { EmblaCarouselType } from 'embla-carousel-svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { fade } from 'svelte/transition';
  import ListContainer from './ListContainer.svelte';

  export let exhibitions: Exhibition[];

  let innerWidth = 0;

  let headerEl: HTMLElement;
  let headerElLeftPos = 0;
  let emblaApi: EmblaCarouselType;

  $: chunks = chunkArray(exhibitions, slidesNumber);
  $: slidesNumber =
    innerWidth >= 1536 ? 6 : innerWidth >= 1280 ? 4 : innerWidth >= 768 ? 2 : 1;
  $: if (!!headerEl && innerWidth) {
    headerElLeftPos = headerEl.getBoundingClientRect().left;
  }
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
  title="Our exhibition"
  showNav={chunks.length > 1}>
  <div
    class="overflow-hidden"
    on:emblaInit={onInit}
    use:emblaCarouselSvelte={{
      plugins: [],
      options: { active: chunks.length > 1 },
    }}>
    <div class="flex md:ml-[-1.56rem]">
      {#each chunks as chunk}
        <div
          class="relative grid flex-[0_0_100%] grid-cols-1 md:grid-cols-2 md:gap-y-[3.5rem] 2xl:grid-cols-3">
          {#each chunk as { name, slug, tag, type, asset, _id } (_id)}
            <div class="pl-[1.56rem]" in:fade out:fade={{ duration: 0 }}>
              <Card
                el="a"
                href={`/exhibition/${slug.current}`}
                class="flex flex-col gap-y-[1.25rem]"
                let:Asset
                let:Title
                let:Container
                let:Subtitle>
                <Asset {asset} />
                <Container>
                  <div>
                    <Title class="inline">{name}</Title>
                    <h6
                      class="inline text-[1rem] font-medium tracking-[0.02rem] text-[#1B1B1E]">
                      /
                      {#if typeof type === 'string'}
                        {type}
                      {:else}
                        {type.name}
                      {/if}
                    </h6>
                  </div>
                  <Subtitle class="font-optiberling-agency text-sonic-silver">
                    {tag.name}
                  </Subtitle>
                </Container>
              </Card>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</ListContainer>
