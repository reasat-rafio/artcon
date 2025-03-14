<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { Association } from '@/lib/types/common.types';
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
          <C.Title>{descriptionBlock.gallery.name}</C.Title>
          {#if descriptionBlock.gallery?.location}
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
