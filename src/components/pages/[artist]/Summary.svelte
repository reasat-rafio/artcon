<script lang="ts">
  import ParallaxScrollImage from '@/components/parallax-scroll-image/ParallaxScrollImage.svelte';
  import Quote from '@/components/Quote.svelte';
  import VrExhibition from '@/components/VRExhibition.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { ArtistSummaryProps } from '@/lib/types/artistDetail.types';

  export let props: ArtistSummaryProps;
  $: ({ quote, vrExhibition, descriptionBlock, images, statement } = props);
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-[23px]">
            <C.Title>{descriptionBlock.name}</C.Title>
            <C.Subtitle>{descriptionBlock.subtile}</C.Subtitle>
          </C.HeaderContainer>

          <C.SocialContainer>
            {#each descriptionBlock.socials as { link, icon }}
              <C.Social {link} {icon} />
            {/each}
          </C.SocialContainer>
        </C.IntroContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={descriptionBlock.description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage class="mb-xl">
      <svelte:fragment slot="first-image" let:Image>
        <Image image={images[0]} />
      </svelte:fragment>
      <svelte:fragment slot="second-image" let:Image>
        <Image image={images[1]} />
      </svelte:fragment>
    </ParallaxScrollImage>

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.Title>{statement.title}</C.Title>
        </C.IntroContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={statement.description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VrExhibition {vrExhibition} />
  </div>
</section>
