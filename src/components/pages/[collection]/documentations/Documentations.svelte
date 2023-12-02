<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { DocumentationsProps } from '@/lib/types/collection-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import PublicationImage from '../../[artist]/publication/PublicationImage.svelte';
  import Autoplay from 'embla-carousel-autoplay';

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
        {#each documents as { quote, descriptionBlock: { name, author, cta, information, description }, image }}
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
                      <C.Subtitle>{author}</C.Subtitle>
                    {/if}
                  </C.HeaderContainer>

                  {#if !!information}
                    <div class="sub-title-light">
                      <PortableText value={information} />
                    </div>
                  {/if}

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
