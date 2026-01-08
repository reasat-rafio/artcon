<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { Association, SocialProps, Cta } from '@/lib/types/common.types';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type {
    Gallery,
    SummaryProps,
  } from '@/lib/types/exhibition-detail.types';
  import type { PortableTextBlock } from 'sanity';

  type Props = SummaryProps & {
    descriptionBlock: {
      gallery: Gallery;
      date: string;
      associationsList?: Association[];
      associationsButton?: Cta;
      socials?: SocialProps[];
      organizedBy?: string[];
      publishedBy?: string[];
      description?: PortableTextBlock[];
    };
  };

  export let props: Props;
  $: ({ quote, vr, descriptionBlock } = props);
</script>

<section>
  <div class="container-primary py-[1.875rem] md:py-[3.75rem] xl:pb-[6.75rem] xl:pt-[6.75rem]">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[1.875rem] space-y-0">
          {@const galleryUrl = descriptionBlock.gallery.url || (descriptionBlock.gallery.location?.startsWith('http') ? descriptionBlock.gallery.location : null)}
          {#if galleryUrl}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer transition-colors">
              <C.Title class="!leading-none !mb-0 hover:!text-gray-500">{descriptionBlock.gallery.name}</C.Title>
            </a>
          {:else}
            <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
          {/if}
          {#if descriptionBlock.gallery.location && !descriptionBlock.gallery.location.startsWith('http')}
            <C.Subtitle class="!leading-none !mt-0 !mb-0">{descriptionBlock.gallery.location}</C.Subtitle>
          {/if}
          <C.Subtitle class="!mt-[10px] !leading-none !mb-0">{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        {#if !!descriptionBlock?.associationsList?.length}
          <div class="mb-[1.875rem] space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value, url, logo }}
              <div>
                <C.Subtitle
                  el="h4"
                  variant="sm"
                  class="!text-[0.875rem] text-sonic-silver">
                  {key}
                </C.Subtitle>
                {#if logo}
                  <div class="mb-2 flex items-center">
                    <img 
                      src={imageBuilder.image(logo).height(50).url()}
                      alt={logo.alt || key} 
                      class="h-[40px] lg:h-[50px] w-auto object-contain"
                    />
                  </div>
                {/if}
                {#if url}
                  <a href={url} target="_blank" rel="noopener noreferrer" class="cursor-pointer hover:underline">
                    <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
                  </a>
                {:else}
                  <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
        {#if descriptionBlock.associationsButton}
          <a
            href={descriptionBlock.associationsButton.href}
            target="{descriptionBlock.associationsButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.associationsButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="mt-[20px] inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:mt-[30px] lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.associationsButton.title}
          </a>
        {/if}
        {#if !!descriptionBlock.socials?.length}
          <C.SocialContainer class="mt-[1.875rem]">
            {#each descriptionBlock.socials as { link, type }}
              <C.Social {link} {type} />
            {/each}
          </C.SocialContainer>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        {#if descriptionBlock?.description?.length}
          <Description>
            <PortableText value={descriptionBlock.description} />
          </Description>
        {/if}
      </svelte:fragment>
    </DescriptionBlock>

    {#if !!vr}
      <VR {vr} />
    {/if}
  </div>
</section>
