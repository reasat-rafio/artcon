<script lang="ts">
  import NewsAndMediaSlider from '@/components/common/NewsAndMediaSlider.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibition-detail.types';

  export let props: NewsAndMediaProps;
  $: ({
    quote,
    newsAndMedia,
    descriptionBlock: { description, title },
  } = props);
</script>

<section>
  <div class="py-section">
    {#if !!quote}
      <div class="container-primary">
        <Quote class="mb-section" {quote} />
      </div>
    {/if}

    {#if !!newsAndMedia?.length}
      <NewsAndMediaSlider
        class="container-primary mb-sm md:mb-[4.63rem] xl:pr-[4.375rem]"
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
              <Title el="h4">{title}</Title>
              <Subtitle
                class="!font-optiberling-agency !font-medium text-sonic-silver">
                {subtitle}
              </Subtitle>
            </Container>
          </Card>
        {/each}
      </NewsAndMediaSlider>
    {/if}

    <div class="container-primary">
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
  </div>
</section>
