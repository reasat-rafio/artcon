<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PortableTextBlock } from 'sanity';
  import type { Asset, Quote as QuoteType } from '@/lib/types/common.types';

  type Props = {
    quote?: QuoteType;
    title?: string;
    description?: PortableTextBlock[];
    media?: Asset;
    descriptionBlock: {
      gallery: { name: string; location: string; url: string };
      date: string;
      description?: PortableTextBlock[];
      associationsList?: any[];
      socials?: any[];
    };
  };

  export let props: Props;
  $: ({ quote, title, description, media, descriptionBlock } = props);
</script>

<section>
  <div class="container-primary pt-sm md:pt-[5rem] xl:pt-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[20px] lg:mb-[40px] xl:mb-[50px] space-y-0">
          <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
        </C.HeaderContainer>
        {#if title}
          <C.Subtitle class="!mt-[10px] !leading-none !mb-0">{title}</C.Subtitle>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        {#if description?.length}
          <Description>
            <PortableText value={description} />
          </Description>
        {/if}
      </svelte:fragment>
    </DescriptionBlock>

    {#if !!media}
      <div class="space-y-sm md:space-y-[80px] xl:space-y-xl">
        {#if media.image}
          <figure class="w-full">
            <SanityImage
              class="w-full h-auto object-cover rounded-[25px]"
              src={media.image}
              alt={media.image?.alt || 'Services media'}
              imageUrlBuilder={imageBuilder}
              sizes="100vw" />
          </figure>
        {:else if media.video}
          <figure class="w-full">
            <video
              class="w-full h-auto object-cover rounded-[25px]"
              width="100%"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              controls={false}
              playsInline
              autoPlay
              muted
              loop>
              <source src={media.video.mov} type="video/mp4; codecs=hvc1" />
              <source src={media.video.webm} type="video/webm" />
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
          </figure>
        {/if}
      </div>
    {/if}
  </div>
</section>
