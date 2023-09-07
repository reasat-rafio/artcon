<script lang="ts">
  import type {
    Association,
    SummaryProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import VR from '@/components/VR.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { PortableTextBlock } from 'sanity';
  import type { Gallery } from '@/lib/types/exhibitionDetail.types';

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

<section class="py-xl">
  <div class="container">
    <Quote class="mb- xl:mb-xl" {quote} />

    <!-- <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-10">
            <C.Title>{descriptionBlock.gallery.name}</C.Title>
            <C.Subtitle weight="light">{descriptionBlock.date}</C.Subtitle>
          </C.HeaderContainer>
          <div class="space-y-4">
            {#each descriptionBlock.associationsList as { key, value }}
              <div>
                <C.Subtitle
                  weight="light"
                  class="!leading-tight !text-sonic-silver">{key}</C.Subtitle
                >
                <C.Subtitle weight="light">{value}</C.Subtitle>
              </div>
            {/each}
          </div>
        </C.IntroContainer>
      </svelte:fragment>
      <svelte:fragment slot="description" let:C>
        <C.DescriptionContainer>
          <C.Description>
            <C.PortableTextBlock value={descriptionBlock.description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VR {vr} /> -->
  </div>
</section>
