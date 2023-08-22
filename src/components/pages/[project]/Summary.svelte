<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import VR from '@/components/VR.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { SummaryProps } from '@/lib/types/projectDetail.types';

  interface SProps extends SummaryProps {
    date: string;
  }

  export let props: SProps;
  $: ({ quote, vr, descriptionBlock, date } = props);
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-10">
            <C.Title>{descriptionBlock.name}</C.Title>
            <C.Subtitle weight="light">{date}</C.Subtitle>
          </C.HeaderContainer>
          <div class="space-y-4">
            {#each descriptionBlock.moreInformations as { key, value }}
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

    <VR {vr} />
  </div>
</section>
