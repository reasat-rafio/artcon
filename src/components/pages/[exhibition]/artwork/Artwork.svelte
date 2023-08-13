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
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.Title class="mb-10">{title}</C.Title>
          <C.Cta href={cta.href}>{cta.title}</C.Cta>
        </C.IntroContainer>
      </svelte:fragment>
      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
