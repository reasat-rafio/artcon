<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibitionDetail.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: NewsAndMediaProps;
  $: ({
    quote,
    newsAndMedia,
    descriptionBlock: { description, title },
  } = props);
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
            el="a"
            href={link}
            class="space-y-[20px]"
            let:Container
            let:Title
            let:Subtitle
            let:Image
          >
            <Image {image} />
            <Container>
              <Title>{title}</Title>
              <Subtitle class="text-sonic-silver">{subtitle}</Subtitle>
            </Container>
          </Card>
        {/each}
      </Gallery>
    </Carousel>

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.Title>{title}</C.Title>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
