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

<section>
  <div class="max-w-section px-section py-section">
    <Quote class="mb-section" {quote} />
    <Artworks class="mb-section hidden lg:grid" {artworks} />

    <DescriptionBlock class="max-lg:mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.Title class="lg:mb-10">{title}</C.Title>
        <Cta class="hidden lg:block" href={cta.href}>{cta.title}</Cta>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
        <Cta class="mt-[1.56rem] block lg:hidden" href={cta.href}
          >{cta.title}</Cta
        >
      </svelte:fragment>
    </DescriptionBlock>

    <Artworks class="grid lg:hidden" {artworks} />
  </div>
</section>
