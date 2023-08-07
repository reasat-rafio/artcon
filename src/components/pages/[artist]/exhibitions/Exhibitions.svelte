<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { ExhibitionsProps } from '@/lib/types/artistDetail.types';
  import emblaCarouselSvelte, {
    type EmblaCarouselType,
  } from 'embla-carousel-svelte';
  import Image from './Image.svelte';

  export let props: ExhibitionsProps;
  let { exhibitions } = props;

  let emblaApi: EmblaCarouselType;
  const onInit = (event: CustomEvent<EmblaCarouselType>) =>
    (emblaApi = event.detail);

  const scrollNext = () => emblaApi.scrollNext();
  const scrollPrev = () => emblaApi.scrollPrev();
</script>

<section class="py-xl">
  <div
    class="overflow-hidden"
    use:emblaCarouselSvelte={{ plugins: [], options: { duration: 30 } }}
    on:emblaInit={onInit}
  >
    <div class="flex">
      {#each exhibitions as ex}
        {#each ex as { descriptionBlock: { title, subtitle, information, cta, description }, image, quote }}
          <section class="relative flex-[0_0_100%]">
            <div class="container">
              <Image
                {image}
                on:scrollNext={scrollNext}
                on:scrollPrev={scrollPrev}
              />
              <Quote class="mb-xl" {quote} />

              <DescriptionBlock>
                <svelte:fragment slot="intro" let:C>
                  <C.IntroContainer class="space-y-[36px]">
                    <C.HeaderContainer>
                      <C.Title>{title}</C.Title>
                      <C.Subtitle>{subtitle}</C.Subtitle>
                    </C.HeaderContainer>

                    <C.PortableTextBlock value={information} />
                    <C.Cta href={cta.href}>{cta.title}</C.Cta>
                  </C.IntroContainer>
                </svelte:fragment>
                <svelte:fragment slot="description" let:C>
                  <C.DescriptionContainer>
                    <C.Description>{description}</C.Description>
                  </C.DescriptionContainer>
                </svelte:fragment>
              </DescriptionBlock>
            </div>
          </section>
        {/each}
      {/each}
    </div>
  </div>
</section>
