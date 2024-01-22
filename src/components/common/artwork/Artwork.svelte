<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    CommonArtworkSectionProps,
    ShortArtworks,
  } from '@/lib/types/common.types';
  import Artworks from './Artworks.svelte';

  export let props: CommonArtworkSectionProps & {
    artworks?: ShortArtworks[];
    artworkAtLast?: boolean;
    ctaLink: string;
  };

  $: ({
    quote,
    artworks,
    artworkAtLast,
    descriptionBlock: { description, title },
    ctaLink,
  } = props);
</script>

<section>
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    {#if !artworkAtLast && !!artworks?.length}
      <Artworks class="mb-section" {artworks} />
    {/if}

    <DescriptionBlock class={artworkAtLast && 'mb-section'}>
      <svelte:fragment slot="intro" let:C>
        <C.Title class="lg:mb-10">{title}</C.Title>
        <Cta className="hidden lg:block capitalize" href={ctaLink}>
          All Artworks
        </Cta>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
        <Cta className="mt-[1.56rem] block lg:hidden capitalize" href={ctaLink}>
          All Artworks
        </Cta>
      </svelte:fragment>
    </DescriptionBlock>

    {#if artworkAtLast && !!artworks?.length}
      <Artworks {artworks} />
    {/if}
  </div>
</section>
