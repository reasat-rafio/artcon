<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    Publication,
    PublicationProps,
  } from '@/lib/types/exhibition-detail.types';

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
          img: { ...publicationImage, alt: name },
          caption: name,
          link: `/preview/publication/${slug.current}`,
        },
      ]} />

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <div class="space-y-[2.25rem]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            <C.Subtitle
              class="font-inter !text-[0.875rem] font-light leading-[120%]">
              {subtitle}
            </C.Subtitle>
          </C.HeaderContainer>

          <div>
            <C.Subtitle class="!text-[0.75rem] font-light  text-eerie-black">
              Published by
              {#each publishedBy as p, i}
                <div class="inline font-light">
                  {#if i === publishedBy.length - 1}
                    <span class="">and</span>
                  {:else if i !== 0}
                    ,
                  {/if}
                  <span class="!text-[0.875rem] font-normal">
                    {p}
                  </span>
                </div>
              {/each}
            </C.Subtitle>
            <C.Subtitle class="!text-[0.75rem]">ISBN {isbn}</C.Subtitle>
          </div>

          <Cta className="capitalize" href={exproleLink.href}>
            {exproleLink.title}
          </Cta>
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
