<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibitionDetail.types';

  export let props: NewsAndMediaProps;
  let {
    quote,
    newsAndMedia,
    descriptionBlock: { description, title },
  } = props;
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <Carousel class="mb-xl" let:Gallery>
      <Gallery
        class="mr-5 grid grid-cols-3 gap-x-[25px] gap-y-[56px] "
        slidesPerPage={6}
        items={newsAndMedia}
        let:chunk
      >
        {#each chunk as { image, link, subtitle, title }}
          <Card
            class="space-y-[20px]"
            href={link}
            let:Title
            let:Subtitle
            let:Image
          >
            <Image {image} />
            <header class="space-y-[10px]">
              <Title>{title}</Title>
              <Subtitle class="text-sonic-silver">{subtitle}</Subtitle>
            </header>
          </Card>
        {/each}
      </Gallery>
    </Carousel>

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.Title>{title}</C.Title>
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
