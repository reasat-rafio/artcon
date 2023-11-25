<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type {
    ArtistSummaryProps,
    PersonalDocuments,
  } from '@/lib/types/artist-detail.types';
  import { PortableText } from '@portabletext/svelte';
  import { DateTime } from 'luxon';

  export let props: ArtistSummaryProps & {
    personalDocuments: PersonalDocuments;
  };

  $: ({ quote, vr, images, statement, personalDocuments } = props);
</script>

<section>
  <div class="container-primary py-sm md:py-[80px] xl:pb-[107px] xl:pt-xl">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[23px]">
          <C.Title>{personalDocuments.name}</C.Title>
          <C.Subtitle variant="sm">
            b. {DateTime.fromISO(personalDocuments.born).toFormat('yyyy')}
          </C.Subtitle>
        </C.HeaderContainer>

        <C.SocialContainer>
          {#each personalDocuments.socials as { link, type }}
            <C.Social {link} {type} />
          {/each}
        </C.SocialContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={personalDocuments.shortBio} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage
      class="mb-section"
      images={[{ img: images[0] }, { img: images[1] }]} />

    {#if statement?.title && statement?.description}
      <DescriptionBlock class="mb-section">
        <svelte:fragment slot="intro" let:C>
          <C.Title>{statement.title}</C.Title>
        </svelte:fragment>

        <svelte:fragment slot="description" let:Description>
          <Description>
            <PortableText value={statement.description} />
          </Description>
        </svelte:fragment>
      </DescriptionBlock>
    {/if}

    {#if !!vr}
      <VR {vr} />
    {/if}
  </div>
</section>
