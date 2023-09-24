<script lang="ts">
  import type {
    Publication,
    PublicationProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import ParallaxScrollImage from '@/components/ParallaxScrollImage.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import { PortableText } from '@portabletext/svelte';

  export let props: PublicationProps & {
    publication: Publication;
  };
  $: ({
    publication: {
      description,
      subtitle,
      name,
      publishedBy,
      isbn,
      quote,
      exproleLink,
      publicationImage,
      slug,
    },
    invitationCardImage,
  } = props);
</script>

<section class="py-section">
  <div class="container">
    <Quote class="mb-section" {quote} />

    <ParallaxScrollImage
      class="mb-section"
      images={[
        {
          img: invitationCardImage,
          link: `/publications/${slug.current}`,
          caption: name,
        },
        { img: publicationImage },
      ]}
    />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <div class="space-y-[36px]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            <C.Subtitle>{subtitle}</C.Subtitle>
          </C.HeaderContainer>

          <div class="space-y-[6px]">
            <C.Subtitle variant="sm">
              Published by
              {#each publishedBy as p, i}
                <div class="inline font-medium text-[#000]">
                  {#if i === publishedBy.length - 1}
                    <span class="font-normal">and</span>
                  {:else if i !== 0}
                    ,
                  {/if}
                  {p}
                </div>
              {/each}
            </C.Subtitle>
            <C.Subtitle variant="sm">ISBN {isbn}</C.Subtitle>
          </div>

          <Cta href={exproleLink.href}>{exproleLink.title}</Cta>
        </div>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
