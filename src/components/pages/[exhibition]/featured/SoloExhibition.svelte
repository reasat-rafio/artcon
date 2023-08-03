<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import type { SoloExhibiton } from '@/lib/types/exhibitionDetail.types';
  import Images from './Images.svelte';
  import VrExhibition from '@/components/VRExhibition.svelte';

  export let props: SoloExhibiton;
  let { quote, vrExhibition, descriptionBlock, images, statement } = props;
</script>

<div class="py-xl">
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

  <Images class="mb-xl" {images} />

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
        <Description>{statement.statement}</Description>
      </DescriptionContainer>
    </svelte:fragment>
  </DescriptionBlock>

  <VrExhibition {vrExhibition} />
</div>
