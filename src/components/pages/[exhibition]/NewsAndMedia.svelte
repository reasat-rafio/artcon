<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Quote from '@/components/common/Quote.svelte';
  // import Carousel from '@/components/ui/carousel/Carousel.svelte';
  import Card from '@/components/ui/card/Card.svelte';
  import type { NewsAndMediaProps } from '@/lib/types/exhibition-detail.types';
  import Gallery from '@/components/ui/carousel/Gallery.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

  export let props: NewsAndMediaProps;
  $: ({
    quote,
    newsAndMedia,
    descriptionBlock: { description, title },
  } = props);

  let innerWidth = 0;
  let descriptionBlockEl: HTMLElement;
  let descriptionBlockElLeftPos = 0;

  $: if (!!descriptionBlockEl && innerWidth) {
    descriptionBlockElLeftPos = descriptionBlockEl.getBoundingClientRect().left;
  }
</script>

<svelte:window bind:innerWidth />
<section>
  <div class="py-section">
    {#if !!quote}
      <div class="container-primary">
        <Quote class="mb-section" {quote} />
      </div>
    {/if}

    <div class="mb-section">
      <div
        style="margin-left: {descriptionBlockElLeftPos}px;"
        class="max-w-[85.3rem]">
        <Gallery loop items={newsAndMedia} let:chunk>
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
    </div>

    <div class="container-primary" bind:this={descriptionBlockEl}>
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
