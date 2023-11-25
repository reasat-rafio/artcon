<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Quote from '@/components/common/Quote.svelte';
  // import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibition-detail.types';
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
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <div class="mb-section lg:mr-[4.375rem]">
      <Gallery items={newsAndMedia} let:chunk>
        {#each chunk as { image, link, subtitle, title }}
          <Card
            el="a"
            href={link}
            class="space-y-[1.25rem] pl-[1.25rem]"
            let:Container
            let:Title
            let:Subtitle
            let:Image>
            <Image {image} />
            <Container>
              <Title>{title}</Title>
              <Subtitle
                class="!font-optiberling-agency !font-medium text-sonic-silver">
                {subtitle}
              </Subtitle>
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
