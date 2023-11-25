<script lang="ts">
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Artworks from './Artworks.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import { PortableText } from '@portabletext/svelte';
  import type {
    CommonArtworkSectionProps,
    ShortArtworks,
  } from '@/lib/types/common.types';

  export let props: CommonArtworkSectionProps & {
    artworks: ShortArtworks;
  };

  $: ({
    quote,
    artworks,
    descriptionBlock: { description, title, cta },
  } = props);
</script>

<section>
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.Title class="lg:mb-10">{title}</C.Title>
        <Cta class="hidden lg:block" href={cta.href}>{cta.title}</Cta>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
        <Cta class="mt-[1.56rem] block lg:hidden" href={cta.href}>
          {cta.title}
        </Cta>
      </svelte:fragment>
    </DescriptionBlock>

    <!-- @TODO fix the types -->
    <Artworks class="hidden lg:grid" {artworks} />
  </div>
</section>
