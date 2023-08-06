<script lang="ts">
  import ParallaxScrollImage from '@/components/ParallaxScrollImage.svelte';
  import Quote from '@/components/Quote.svelte';
  import VrExhibition from '@/components/VRExhibition.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { ArtistSummaryProps } from '@/lib/types/artistDetail.types';

  export let props: ArtistSummaryProps;
  let { quote, vrExhibition, descriptionBlock, images, statement } = props;
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment
        slot="intro"
        let:IntroContainer
        let:HeaderContainer
        let:Title
        let:Subtitle
        let:SocialContainer
        let:Social
      >
        <IntroContainer>
          <HeaderContainer class="mb-[23px]">
            <Title>{descriptionBlock.name}</Title>
            <Subtitle>{descriptionBlock.subtile}</Subtitle>
          </HeaderContainer>

          <SocialContainer>
            {#each descriptionBlock.socials as { link, icon }}
              <Social {link} {icon} />
            {/each}
          </SocialContainer>
        </IntroContainer>
      </svelte:fragment>

      <svelte:fragment
        slot="description"
        let:DescriptionContainer
        let:Description
      >
        <DescriptionContainer>
          <Description>{descriptionBlock.description}</Description>
        </DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage class="mb-xl" {images} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:IntroContainer let:Title>
        <IntroContainer>
          <Title>{statement.title}</Title>
        </IntroContainer>
      </svelte:fragment>

      <svelte:fragment
        slot="description"
        let:DescriptionContainer
        let:Description
      >
        <DescriptionContainer>
          <Description>{statement.description}</Description>
        </DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VrExhibition {vrExhibition} />
  </div>
</section>
