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

    {#if !!newsAndMedia?.length}
      <NewsAndMediaSlider
        class="mb-section"
        let:chunk
        leftPos={descriptionBlockElLeftPos}
        {newsAndMedia}>
        {#each chunk as { image, link, subtitle, title }}
          <Card
            el="a"
            href={link}
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
