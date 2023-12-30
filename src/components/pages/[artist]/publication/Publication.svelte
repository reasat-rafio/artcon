<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { Publication } from '@/lib/types/artist-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
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

  // let publicationEl: HTMLElement;
  // let publicationSectionHeight = 0;
  // let navigationPositionFromSectionTop = 0;
  // const getNavigationPositionFromSectionTop = () => {
  //   navigationPositionFromSectionTop =
  //     publicationEl.getBoundingClientRect().top -
  //     rootEl.getBoundingClientRect().top +
  //     publicationSectionHeight / 2;
  // };

  // $: if (!!rootEl && !!publicationEl) getNavigationPositionFromSectionTop();
</script>

<!-- <svelte:window on:resize={getNavigationPositionFromSectionTop} /> -->
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
        {#each publications as { quote, subtitle, isbn, description, exproleLink, name, publicationImage, publishedBy }}
          <div class="flex-[0_0_100%] pl-[4rem]">
            {#if !!quote}
              <Quote class="mb-section" {quote} />
            {/if}

            <!-- bind:publicationSectionHeight -->
            <!-- bind:publicationEl -->
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
