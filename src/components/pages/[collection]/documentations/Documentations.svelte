<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { DocumentationsProps } from '@/lib/types/collection-detail.types';
  import type { EmblaCarouselType } from 'embla-carousel';
  import Autoplay from 'embla-carousel-autoplay';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import PublicationImage from '../../[artist]/publication/PublicationImage.svelte';

  export let props: DocumentationsProps;
  $: ({ documents } = props);

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
        {#each documents as { quote, descriptionBlock: { name, author, cta, isbn, publishedBy, description }, image }}
          <div class="flex-[0_0_100%] pl-[4rem]">
            {#if !!quote}
              <Quote class="mb-section" {quote} />
            {/if}

            <PublicationImage {name} {slideNext} {slidePrev} {image} />

            <DescriptionBlock class="mt-section">
              <svelte:fragment slot="intro" let:C>
                <div class="space-y-[36px]">
                  <C.HeaderContainer>
                    <C.Title>{name}</C.Title>
                    {#if !!author}
                      <C.Subtitle
                        class="font-inter !text-[0.875rem] font-light leading-[120%]">
                        {author}
                      </C.Subtitle>
                    {/if}
                  </C.HeaderContainer>

                  <div>
                    {#if !!publishedBy?.length}
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
                    {/if}

                    {#if !!isbn}
                      <C.Subtitle class="!text-[0.75rem]">
                        ISBN {isbn}
                      </C.Subtitle>
                    {/if}
                  </div>

                  {#if !!cta?.title && !!cta?.href}
                    <Cta href={cta.href}>{cta.title}</Cta>
                  {/if}
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
