<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/event-detail.types';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import NewsAndMediaSlider from '@/components/common/NewsAndMediaSlider.svelte';

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

    {#if !!newsAndMedia?.length}
      <NewsAndMediaSlider
        class="mb-sm md:mb-[4.63rem]"
        let:chunk
        {newsAndMedia}>
        {#each chunk as { image, link, subtitle, title }}
          <Card
            el="a"
            href={link}
            target="_blank"
            class="space-y-[1.25rem] pl-[1.56rem]"
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
      </NewsAndMediaSlider>
    {/if}

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
