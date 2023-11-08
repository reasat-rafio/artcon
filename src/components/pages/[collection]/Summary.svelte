<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  import type {
    Information,
    Provenance,
    SummaryProps,
  } from '@/lib/types/collection-detail.types';
  import { PortableText } from '@portabletext/svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { DateTime } from 'luxon';

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
  };

  $: ({ quote, provenance, vr } = props);
</script>

<section>
  <div class="container-primary py-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <!-- <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[23px]">
          <C.Title>{personalDocuments.name}</C.Title>
          <C.Subtitle variant="sm"
            >b. {DateTime.fromISO(personalDocuments.born).toFormat(
              'yyyy',
            )}</C.Subtitle
          >
        </C.HeaderContainer>

        <C.SocialContainer>
          {#each personalDocuments.socials as { link, type }}
            <C.Social {link} {type} />
          {/each}
        </C.SocialContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={personalDocuments.shortBio} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage
      class="mb-section"
      images={[{ img: images[0] }, { img: images[1] }]}
    /> -->

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
