<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  // import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibitionDetail.types';
  import { PortableText } from '@portabletext/svelte';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';

  export let props: NewsAndMediaProps;
  $: ({
    quote,
    newsAndMedia,
    descriptionBlock: { description, title },
  } = props);
</script>

<section>
  <div class="max-w-section px-section py-section">
    <Quote class="mb-section" {quote} />

    <div class="mb-section">
      <Gallery items={newsAndMedia} let:chunk>
        {#each chunk as { image, link, subtitle, title }}
          <Card
            el="a"
            href={link}
            class="space-y-[20px] pl-[20px]"
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
    </div>

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
