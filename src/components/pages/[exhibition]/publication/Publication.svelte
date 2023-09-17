<script lang="ts">
  import type {
    Publication,
    PublicationProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import ParallaxScrollImage from '@/components/ParallaxScrollImage.svelte';

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

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <ParallaxScrollImage class="mb-xl">
      <svelte:fragment slot="first-image" let:Image>
        <Image image={invitationCardImage} />
      </svelte:fragment>
      <svelte:fragment slot="second-image" let:Image>
        <Image
          el="a"
          caption={name}
          href={`/publications/${slug.current}`}
          image={publicationImage}
        />
      </svelte:fragment>
    </ParallaxScrollImage>

    <DescriptionBlock>
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer class="space-y-[36px]">
          <C.HeaderContainer>
            <C.Title>{name}</C.Title>
            <C.Subtitle>{subtitle}</C.Subtitle>
          </C.HeaderContainer>

          <div class="space-y-[6px]">
            <div>
              Published by
              {#each publishedBy as p, i}
                <C.Subtitle class="inline font-medium text-[#000]">
                  {#if i === publishedBy.length - 1}
                    <span class="font-normal">and</span>
                  {:else if i !== 0}
                    ,
                  {/if}
                  {p}
                </C.Subtitle>
              {/each}
            </div>
            <C.Subtitle>ISBN {isbn}</C.Subtitle>
          </div>

          <C.Cta href={exproleLink.href}>{exproleLink.title}</C.Cta>
        </C.IntroContainer>
      </svelte:fragment>
      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>
  </div>
</section>
