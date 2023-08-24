<script lang="ts">
  import type {
    Association,
    SummaryProps,
  } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import VR from '@/components/VR.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { PortableTextBlock } from 'sanity';

  type Props = SummaryProps & {
    exhibition: {
      date: string;
      associationsList: Association[];
      name: string;
      description: PortableTextBlock[];
    };
  };

  export let props: Props;
  $: ({ quote, vr, exhibition } = props);
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-10">
            <C.Title>{exhibition.name}</C.Title>
            <C.Subtitle weight="light">{exhibition.date}</C.Subtitle>
          </C.HeaderContainer>
          <div class="space-y-4">
            {#each exhibition.associationsList as { key, value }}
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
            <C.PortableTextBlock value={exhibition.description} />
          </C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VR {vr} />
  </div>
</section>
