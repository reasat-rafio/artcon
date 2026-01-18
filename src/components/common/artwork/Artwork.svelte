<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    ArtworkItem,
    CommonArtworkSectionProps,
    ShortArtworks,
  } from '@/lib/types/common.types';
  import Artworks from './Artworks.svelte';
  import ArtworkItems from './ArtworkItems.svelte';

  export let props: CommonArtworkSectionProps & {
    artworks?: (ArtworkItem | ShortArtworks)[] | undefined;
    artworkAtLast?: boolean;
    ctaLink: string;
    ctaTitle?: string;
  };

  $: ({
    quote,
    artworks,
    artworkAtLast,
    descriptionBlock: { description, title },
    ctaLink,
    ctaTitle,
  } = props);

  // Type guard to check if artworks are ArtworkItem[]
  $: isArtworkItems = artworks && artworks.length > 0 && '_type' in artworks[0] && (artworks[0] as any)._type === 'artworkItem';
  $: artworkItemsData = isArtworkItems && artworks ? (artworks as ArtworkItem[]) : [];
  $: shortArtworksData = !isArtworkItems && artworks ? (artworks as ShortArtworks[]) : [];
</script>

<section>
  <div class="pt-section container-primary {$$props.class}">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    {#if !artworkAtLast && !!artworks?.length}
      {#if isArtworkItems}
        <ArtworkItems class="mb-section" artworks={artworkItemsData} />
      {:else}
        <Artworks class="mb-section" artworks={shortArtworksData} />
      {/if}
    {/if}

    <DescriptionBlock class={artworkAtLast && 'mb-section'}>
      <svelte:fragment slot="intro" let:C>
        <C.Title class="lg:mb-10">{title}</C.Title>
        <Cta className="hidden lg:block capitalize" href={ctaLink}>
          {ctaTitle || 'All Artworks'}
        </Cta>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
        <Cta className="mt-[1.56rem] block lg:hidden capitalize" href={ctaLink}>
          {ctaTitle || 'All Artworks'}
        </Cta>
      </svelte:fragment>
    </DescriptionBlock>

    {#if artworkAtLast && !!artworks?.length}
      {#if isArtworkItems}
        <ArtworkItems artworks={artworkItemsData} />
      {:else}
        <Artworks artworks={shortArtworksData} />
      {/if}
    {/if}
  </div>
</section>
