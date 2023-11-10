<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';

  import type {
    Information,
    Provenance,
    SummaryProps,
  } from '@/lib/types/collection-detail.types';
  import { PortableText } from '@portabletext/svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import ArtworkDetails from './ArtworkDetails.svelte';
  import type { Cta } from '@/lib/types/common.types';

  export let props: SummaryProps & {
    provenance: Provenance;
    artworkName: string;
    artworkImages: SanityImageAssetDocument[];
    artist: {
      name: string;
      born: string;
      country: string;
    };
    information: Information;
    inquiryButton: Cta;
  };

  $: ({
    quote,
    provenance,
    artist,
    artworkImages,
    artworkName,
    information,
    inquiryButton,
    vr,
  } = props);
</script>

<section>
  <div class="container-primary py-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <ArtworkDetails
      class="mb-section"
      {artist}
      {artworkImages}
      {artworkName}
      {information}
      {inquiryButton} />

    {#if provenance?.title && provenance?.description}
      <DescriptionBlock class="mb-section">
        <svelte:fragment slot="intro" let:C>
          <C.Title>{provenance.title}</C.Title>
        </svelte:fragment>

        <svelte:fragment slot="description" let:Description>
          <Description>
            <PortableText value={provenance.description} />
          </Description>
        </svelte:fragment>
      </DescriptionBlock>
    {/if}

    {#if !!vr}
      <VR {vr} />
    {/if}
  </div>
</section>
