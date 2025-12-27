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
  <div class="container-primary py-sm md:py-[80px] xl:pb-[107px] xl:pt-xl">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[20px] lg:mb-[40px] xl:mb-[50px]">
          {@const galleryUrl = descriptionBlock.gallery.url || (descriptionBlock.gallery.location?.startsWith('http') ? descriptionBlock.gallery.location : null)}
          {#if galleryUrl}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer hover:underline">
              <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
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
          <div class="space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value, logo }}
              <div>
                {#if logo}
                  <div class="mb-2 flex">
                    <div class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden bg-gray-100">
                      <img 
                        src={imageBuilder.image(logo).width(100).height(100).url()}
                        alt={key} 
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                {/if}
                <C.Subtitle
                  el="h4"
                  variant="sm"
                  class="!text-[0.875rem] text-sonic-silver">
                  {key}
                </C.Subtitle>
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
            class="mt-[20px] inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:mt-[30px] lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.associationsButton.title}
          </a>
        {/if}
        {#if descriptionBlock.gallery.getServiceButton}
          <a
            href={descriptionBlock.gallery.getServiceButton.href}
            target="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="mt-[20px] inline-block rounded-full border border-black bg-transparent px-[30px] py-[10px] text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-black hover:text-black lg:mt-[30px] lg:px-[40px] lg:py-[12px] lg:text-base">
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
