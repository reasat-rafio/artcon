<script lang="ts">
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import type { SoloExhibiton } from '@/lib/types/exhibitionDetail.types';
  import VrExhibition from '@/components/VRExhibition.svelte';
  import ParallaxScrollImage from '@/components/ParallaxScrollImage.svelte';

  export let props: SoloExhibiton;
  let { quote, vrExhibition, descriptionBlock, images, statement } = props;
</script>

<div class="py-xl">
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
        <C.Description>{descriptionBlock.description}</C.Description>
      </C.DescriptionContainer>
    </svelte:fragment>
  </DescriptionBlock>

  <ParallaxScrollImage class="mb-xl" {images} />

  <DescriptionBlock class="mb-xl">
    <svelte:fragment slot="intro" let:C>
      <C.IntroContainer>
        <C.Title>{statement.title}</C.Title>
      </C.IntroContainer>
    </svelte:fragment>

    <svelte:fragment slot="description" let:C>
      <C.DescriptionContainer>
        <C.Description>{statement.statement}</C.Description>
      </C.DescriptionContainer>
    </svelte:fragment>
  </DescriptionBlock>

  <VrExhibition {vrExhibition} />
</div>
