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
  import { onDestroy } from 'svelte';

  export let publications: Publication[];
  export let artistName: string = '';

  let emblaApi: EmblaCarouselType;
  let rootEl: HTMLElement;
  let autoplayInstance: any;
  let hasStartedMoving = false;

  $: isSinglePublication = publications.length === 1;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
    
    autoplayInstance = emblaApi.plugins()?.autoplay;
    
    emblaApi.on('select', () => {
      const currentIndex = emblaApi.selectedScrollSnap();
      const slideCount = emblaApi.scrollSnapList().length;
      
      if (currentIndex !== 0 && !hasStartedMoving) {
        hasStartedMoving = true;
      }
      
      if (currentIndex === 0 && hasStartedMoving) {
        autoplayInstance?.stop();
      }
    });
  };

  const slideNext = () => emblaApi?.scrollNext();
  const slidePrev = () => emblaApi?.scrollPrev();

  onDestroy(() => {
    autoplayInstance?.stop();
  });
</script>

<section bind:this={rootEl}>
  <div class="container-primary py-section relative border-t border-light-gray/40 pt-[2.26rem]">
    {#if artistName}
      <h3 class="head-xl mb-md">{artistName}'s {publications.length > 1 ? 'publications' : 'publication'}</h3>
    {/if}
    
    {#if isSinglePublication}
      <div class="overflow-hidden">
        <div class="-ml-[4rem] flex">
          {#each publications as { quote, subtitle, isbn, description, exproleLink, name, publicationImage, publishedBy, associationsList }}
            <div class="flex-[0_0_100%] pl-[4rem]">
              {#if !!quote}
                <Quote class="mb-section" {quote} />
              {/if}

              <PublicationImage
                {name}
                isSinglePublication={true}
                image={publicationImage} />

              <DescriptionBlock class="mt-section">
                <svelte:fragment slot="intro" let:C>
                  <div class="space-y-[36px]">
                    <C.HeaderContainer>
                      <C.Title>{name}</C.Title>
                      <C.Subtitle>{subtitle}</C.Subtitle>
                    </C.HeaderContainer>

                    <div>
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
    {:else}
      <!-- Carousel for multiple publications -->
      <div
        use:emblaCarouselSvelte={{
          plugins: [Autoplay({ delay: 6000, stopOnInteraction: false })],
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
                isSinglePublication={false}
                image={publicationImage} />

              <DescriptionBlock class="mt-section">
                <svelte:fragment slot="intro" let:C>
                  <div class="space-y-[36px]">
                    <C.HeaderContainer>
                      <C.Title>{name}</C.Title>
                      <C.Subtitle>{subtitle}</C.Subtitle>
                    </C.HeaderContainer>

                    <div>
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
    {/if}
  </div>
</section>
