<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import type { Association, Cta } from '@/lib/types/common.types';
  import type { Gallery, SummaryProps } from '@/lib/types/project-detail.types';
  import type { PortableTextBlock } from 'sanity';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

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
              <C.Title>{descriptionBlock.gallery.name}</C.Title>
            </a>
          {:else}
            <C.Title>{descriptionBlock.gallery.name}</C.Title>
          {/if}
          {#if descriptionBlock.gallery.location && !descriptionBlock.gallery.location.startsWith('http')}
            <C.Subtitle>{descriptionBlock.gallery.location}</C.Subtitle>
          {/if}
          <C.Subtitle>{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        {#if !!descriptionBlock?.associationsList?.length}
          <div class="space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value }}
              <div>
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
            class="mt-[20px] inline-block rounded-full border border-black px-[30px] py-[10px] text-sm font-medium transition-colors hover:bg-black hover:text-white lg:mt-[30px] lg:px-[40px] lg:py-[12px] lg:text-base">
            {descriptionBlock.associationsButton.title}
          </a>
        {/if}
        {#if descriptionBlock.gallery.getServiceButton}
          <a
            href={descriptionBlock.gallery.getServiceButton.href}
            target="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? '_blank' : '_self'}"
            rel="{descriptionBlock.gallery.getServiceButton.href.startsWith('http') ? 'noopener noreferrer' : ''}"
            class="mt-[20px] inline-block rounded-full border border-black px-[30px] py-[10px] text-sm font-medium transition-colors hover:bg-black hover:text-white lg:mt-[30px] lg:px-[40px] lg:py-[12px] lg:text-base">
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
