<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import H4 from '@/components/ui/H4.svelte';
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

    <DescriptionBlock {description}>
      <H4 class="mb-10">{title}</H4>
      <Cta href={cta.href}>{cta.title}</Cta>
    </DescriptionBlock>
  </div>
</section>
