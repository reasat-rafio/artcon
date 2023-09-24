<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import type {
    ArtworkProps,
    ExhinitionDetailPageProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Artworks from './Artworks.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import { PortableText } from '@portabletext/svelte';

  export let props: ArtworkProps & {
    artworks: ExhinitionDetailPageProps['artworks'];
  };
  $: ({
    quote,
    artworks,
    descriptionBlock: { description, title, cta },
  } = props);
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />
    <Artworks class="mb-xl" {artworks} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.Title class="mb-10">{title}</C.Title>
        <Cta href={cta.href}>{cta.title}</Cta>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
