<script lang="ts">
  import ParallaxScrollImage from '@/components/common/ParallaxScrollImage.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type {
    ArtistSectionProps,
    Artist,
  } from '@/lib/types/collection-detail.types';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import { DateTime } from 'luxon';

  export let props: ArtistSectionProps & {
    artist: Artist;
  };
  $: ({
    artist: {
      name,
      born,
      images: { images },
      shortBio,
      socials,
    },
  } = props);
</script>

<section>
  <div class="container-primary py-section">
    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[23px]">
          <C.Title>{name}</C.Title>
          <C.Subtitle variant="sm">
            b. {DateTime.fromISO(born).toFormat('yyyy')}
          </C.Subtitle>
        </C.HeaderContainer>

        <C.SocialContainer>
          {#each socials as { link, type }}
            <C.Social {link} {type} />
          {/each}
        </C.SocialContainer>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={shortBio} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    <ParallaxScrollImage images={[{ img: images[0] }, { img: images[1] }]} />
  </div>
</section>
