<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { Association, Cta } from '@/lib/types/common.types';
  import type { Gallery, SummaryProps } from '@/lib/types/project-detail.types';
  import type { PortableTextBlock } from 'sanity';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  type Props = SummaryProps & {
    descriptionBlock: {
      gallery: Gallery;
      date: string;
      associationsList?: Association[];
      associationsButton?: Cta;
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
        <C.HeaderContainer class="mb-[1.875rem]">
          {@const galleryUrl = descriptionBlock.gallery.url || (descriptionBlock.gallery.location?.startsWith('http') ? descriptionBlock.gallery.location : null)}
          {#if galleryUrl}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer transition-colors">
              <C.Title class="!leading-none !mb-0 hover:!text-gray-500">{descriptionBlock.gallery.name}</C.Title>
            </a>
          {:else}
            <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
          {/if}
          {#if descriptionBlock.gallery.location && !descriptionBlock.gallery.location.startsWith('http')}
            <C.Subtitle class="!leading-none !mb-0">{descriptionBlock.gallery.location}</C.Subtitle>
          {/if}
          <C.Subtitle class="!mt-[10px] !leading-none !mb-0">{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        {#if !!descriptionBlock?.associationsList?.length}
          <div class="mb-[1.875rem] space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value, logo }}
              <div>
                <C.Subtitle
                  el="h4"
                  variant="sm"
                  class="!text-[0.875rem] text-sonic-silver">
                  {key}
                </C.Subtitle>
                {#if logo}
                  <div class="flex items-center py-[6px]">
                    <img 
                      src={imageBuilder.image(logo).height(50).url()}
                      alt={logo.alt || key} 
                      class="h-[40px] lg:h-[50px] w-auto object-contain"
                    />
                  </div>
                {/if}
                <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
              </div>
            {/each}
          </div>
        {/if}
        {#if descriptionBlock.associationsButton}
          <a
            href={descriptionBlock.associationsButton.href}
            target="{descriptionBlock.associationsButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.associationsButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.associationsButton.title}
          </a>
        {/if}
        {#if descriptionBlock.gallery.getServiceButton}
          <a
            href={descriptionBlock.gallery.getServiceButton.href}
            target="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="mt-[1.875rem] inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.gallery.getServiceButton.title}
          </a>
        {/if}
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        {#if !!descriptionBlock.description?.length}
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
