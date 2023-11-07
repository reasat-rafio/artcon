<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import VR from '@/components/common/Vr.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { Association } from '@/lib/types/common.types';
  import type { Gallery, SummaryProps } from '@/lib/types/projectDetail.types';
  import { PortableText } from '@portabletext/svelte';
  import type { PortableTextBlock } from 'sanity';

  type Props = SummaryProps & {
    descriptionBlock: {
      gallery: Gallery;
      date: string;
      associationsList: Association[];
      description: PortableTextBlock[];
    };
  };

  export let props: Props;
  $: ({ quote, vr, descriptionBlock } = props);
</script>

<section>
  <div class="container-primary py-section">
    {#if !!quote}
      <Quote class="mb-section" {quote} />
    {/if}

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <C.HeaderContainer class="mb-[20px] lg:mb-[40px] xl:mb-[50px]">
          <C.Title>{descriptionBlock.gallery.name}</C.Title>
          <C.Subtitle>{descriptionBlock.date}</C.Subtitle>
        </C.HeaderContainer>
        <div class="space-y-[10px] lg:space-y-[13px]">
          {#each descriptionBlock.associationsList as { key, value }}
            <div>
              <C.Subtitle el="h4" variant="sm" class="text-sonic-silver">
                {key}
              </C.Subtitle>
              <C.Subtitle el="div" variant="sm">{value}</C.Subtitle>
            </div>
          {/each}
        </div>
      </svelte:fragment>

      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={descriptionBlock.description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    {#if !!vr}
      <VR {vr} />
    {/if}
  </div>
</section>
