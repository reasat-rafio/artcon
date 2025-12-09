<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { Publication } from '@/lib/types/artist-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import { type EmblaCarouselType } from 'embla-carousel';
  import PublicationImage from './PublicationImage.svelte';
  import Autoplay from 'embla-carousel-autoplay';

  export let publications: Publication[];

  let emblaApi: EmblaCarouselType;
  let rootEl: HTMLElement;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const slideNext = () => emblaApi.scrollNext();
  const slidePrev = () => emblaApi.scrollPrev();
</script>

<section bind:this={rootEl}>
  <div class="container-primary py-section relative">
    <div
      use:emblaCarouselSvelte={{
        plugins: [Autoplay({ stopOnInteraction: true })],
        options: { loop: true },
      }}
      on:emblaInit={onInit}
      class="overflow-hidden">
      <div class="-ml-[4rem] flex">
        {#each publications as { quote, subtitle, isbn, description, exproleLink, name, publicationImage, publishedBy, associationsList }}
          <div class="flex-[0_0_100%] pl-[4rem]">
            {#if !!quote}
              <Quote class="mb-section" {quote} />
            {/if}

            <PublicationImage
              {name}
              {slideNext}
              {slidePrev}
              image={publicationImage} />

            <DescriptionBlock class="mt-section">
              <svelte:fragment slot="intro" let:C>
                <div class="space-y-[36px]">
                  <C.HeaderContainer>
                    <C.Title>{name}</C.Title>
                    <C.Subtitle>{subtitle}</C.Subtitle>
                  </C.HeaderContainer>

                  <div>
                    {#if !!associationsList?.length}
                      <div class="mb-[1.5rem]">
                        <div class="space-y-[0.5rem]">
                          {#each associationsList as { key, value }}
                            <div>
                              <C.Subtitle
                                class="!text-[0.75rem] font-light text-eerie-black">
                                {key}
                              </C.Subtitle>
                              <C.Subtitle class="!text-[0.875rem] font-normal">
                                {value}
                              </C.Subtitle>
                            </div>
                          {/each}
                        </div>
                      </div>
                    {/if}
                    <C.Subtitle
                      class="!text-[0.75rem] font-light  text-eerie-black">
                      Published by
                      {#each publishedBy as p, i}
                        <div class="inline font-light">
                           {#if i === publishedBy.length - 1 && publishedBy.length > 1}
                            <span>and</span>
                          {:else if i !== 0}
                            ,
                          {/if}
                          <span class="!text-[0.875rem] font-normal">
                            {p}
                          </span>
                        </div>
                      {/each}
                    </C.Subtitle>
                    <C.Subtitle class="!text-[0.75rem]">ISBN {isbn}</C.Subtitle>
                  </div>

                  <Cta className="capitalize" href={exproleLink.href}>
                    {exproleLink.title}
                  </Cta>
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
