<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { Publication } from '@/lib/types/artistDetail.types';
  import { PortableText } from '@portabletext/svelte';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
    type EmblaOptionsType,
    type EmblaPluginType,
  } from 'embla-carousel-svelte';
  import PublicationImage from './PublicationImage.svelte';

  export let publications: Publication[];

  let plugins: EmblaPluginType[] = [];
  let options: Partial<EmblaOptionsType> = {};

  let emblaApi: EmblaCarouselType;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const sliedNext = () => emblaApi.scrollNext();
  const sliedPrev = () => emblaApi.scrollPrev();
</script>

<section>
  <div class="px-section py-section max-w-section">
    <div
      use:emblaCarouselSvelte={{ plugins, options }}
      on:emblaInit={onInit}
      class="overflow-hidden"
    >
      <div class="-ml-[4rem] flex">
        {#each publications as { quote, subtitle, associationsList, isbn, description, exproleLink, name, publicationImage, publishedBy, slug }}
          <div class="flex-[0_0_100%] pl-[4rem]">
            <Quote class="mb-section" {quote} />

            <PublicationImage
              {name}
              {sliedNext}
              {sliedPrev}
              class="mb-section"
              image={publicationImage}
            />

            <DescriptionBlock>
              <svelte:fragment slot="intro" let:C>
                <div class="space-y-[36px]">
                  <C.HeaderContainer>
                    <C.Title>{name}</C.Title>
                    <C.Subtitle>{subtitle}</C.Subtitle>
                  </C.HeaderContainer>

                  <div class="space-y-[6px]">
                    <C.Subtitle variant="sm">
                      Published by
                      {#each publishedBy as p, i}
                        <div class="inline font-medium text-[#000]">
                          {#if i === publishedBy.length - 1}
                            <span class="font-normal">and</span>
                          {:else if i !== 0}
                            ,
                          {/if}
                          {p}
                        </div>
                      {/each}
                    </C.Subtitle>
                    <C.Subtitle variant="sm">ISBN {isbn}</C.Subtitle>
                  </div>

                  <Cta href={exproleLink.href}>{exproleLink.title}</Cta>
                </div>
              </svelte:fragment>

              <svelte:fragment slot="description" let:Description>
                <Description>
                  <PortableText value={description} />
                </Description>
              </svelte:fragment>
            </DescriptionBlock>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>