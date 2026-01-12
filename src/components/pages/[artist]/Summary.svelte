<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type {
    ArtistSummaryProps,
    PersonalDocuments,
  } from '@/lib/types/artist-detail.types';
  import { DateTime } from 'luxon';

  export let props: ArtistSummaryProps & {
    personalDocuments: PersonalDocuments;
  };

  $: ({ quote, vr, images, statement, personalDocuments } = props);
</script>

<section>
  <div class="container-primary {$$props.class}">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[1.5rem]">
          {#if personalDocuments.name}
            <C.Title>{personalDocuments.name}</C.Title>
          {/if}
          {#if personalDocuments?.born}
            <C.Subtitle
              class="!font-inter !text-[0.875rem] !normal-case !leading-none"
              variant="sm">
              b. {DateTime.fromISO(personalDocuments.born).toFormat('yyyy')}
            </C.Subtitle>
          {/if}
        </C.HeaderContainer>

        {#if !!personalDocuments.socials?.length}
          <C.SocialContainer>
            {#each personalDocuments?.socials as { link, type }}
              <C.Social {link} {type} />
            {/each}
          </C.SocialContainer>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        {#if !!personalDocuments?.shortBio}
          <Description>
            <PortableText value={personalDocuments.shortBio} />
          </Description>
        {/if}
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage
      class="mb-sm md:mb-[80px] xl:mb-[6.69rem]"
      disableParallaxOnDesktop={true}
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
