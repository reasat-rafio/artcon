<script lang="ts">
  import ParallaxScrollImage from '@/components/parallax-scroll-image/ParallaxScrollImage.svelte';
  import Quote from '@/components/Quote.svelte';
  import VrExhibition from '@/components/VRExhibition.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type {
    ArtistSummaryProps,
    PersonalDocuments,
  } from '@/lib/types/artistDetail.types';
  import { DateTime } from 'luxon';

  export let props: ArtistSummaryProps;
  export let personalDocuments: PersonalDocuments;

  $: ({ quote, vrExhibition, images, statement } = props);
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-[23px]">
            <C.Title>{personalDocuments.name}</C.Title>
            <C.Subtitle
              >b. {DateTime.fromISO(personalDocuments.born).toFormat(
                'yyyy',
              )}</C.Subtitle
            >
          </C.HeaderContainer>

          <C.SocialContainer>
            {#each personalDocuments.socials as { link, icon }}
              <C.Social {link} {icon} />
            {/each}
          </C.SocialContainer>
        </C.IntroContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={personalDocuments.shortBio} />
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
