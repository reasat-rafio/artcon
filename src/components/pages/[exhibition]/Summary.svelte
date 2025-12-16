<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { Association, SocialProps } from '@/lib/types/common.types';
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
  <div class="container-primary py-sm md:py-[80px] xl:pb-[107px] xl:pt-xl">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[20px] lg:mb-[40px] xl:mb-[50px] space-y-0">
          {@const galleryUrl = descriptionBlock.gallery.url || (descriptionBlock.gallery.location?.startsWith('http') ? descriptionBlock.gallery.location : null)}
          {#if galleryUrl}
            <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer hover:underline">
              <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
            </a>
          {:else}
            <C.Title class="!leading-none !mb-0">{descriptionBlock.gallery.name}</C.Title>
          {/if}
          {#if descriptionBlock.gallery.location && !descriptionBlock.gallery.location.startsWith('http')}
            <C.Subtitle class="!leading-none !mt-0 !mb-0">{descriptionBlock.gallery.location}</C.Subtitle>
          {/if}
          <C.Subtitle class="!mt-[30px] !leading-none !mb-0">{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        {#if !!descriptionBlock?.associationsList?.length}
          <div class="space-y-[10px] lg:space-y-[13px]">
            {#each descriptionBlock.associationsList as { key, value, url }}
              <div>
                <C.Subtitle
                  el="h4"
                  variant="sm"
                  class="!text-[0.625rem] text-sonic-silver">
                  {key}
                </C.Subtitle>
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
        {#if !!descriptionBlock.socials?.length}
          <C.SocialContainer class="mt-[20px] lg:mt-[30px]">
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
