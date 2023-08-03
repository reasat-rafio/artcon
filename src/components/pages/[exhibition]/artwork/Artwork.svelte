<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import type { ArtworkProps } from '@/lib/types/exhibitionDetail.types';
  import Artworks from './Artworks.svelte';

  export let props: ArtworkProps;
  let {
    quote,
    artworks,
    descriptionBlock: { description, title, cta },
  } = props;
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />
    <Artworks class="mb-xl" {artworks} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:IntroContainer let:Title let:Cta>
        <IntroContainer>
          <Title class="mb-10">{title}</Title>
          <Cta href={cta.href}>{cta.title}</Cta>
        </IntroContainer>
      </svelte:fragment>
      <svelte:fragment
        slot="description"
        let:DescriptionContainer
        let:Description
      >
        <DescriptionContainer>
          <Description>{description}</Description>
        </DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
