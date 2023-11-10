<script lang="ts">
  import type {
    Publication,
    PublicationProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/common/Quote.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
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

<section>
  <div class="py-section container-primary">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <ParallaxScrollImage
      class="mb-section"
      images={[
        {
          img: invitationCardImage,
        },
        {
          img: publicationImage,
          caption: name,
          link: `/publications/${slug.current}`,
        },
      ]} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <div class="space-y-[2.25rem]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            <C.Subtitle>{subtitle}</C.Subtitle>
          </C.HeaderContainer>

          <div class="space-y-[0.375rem]">
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
