<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import VR from '@/components/VR.svelte';
  import { DateTime } from 'luxon';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  export let props: SummaryProps;
  $: ({ quote, descriptionBlock, vr } = props);

  const startDate = DateTime.fromISO(descriptionBlock?.startDate);
  const endDate = DateTime.fromISO(descriptionBlock?.endDate);

  const formattedStartDate = startDate.toFormat('d MMMM');
  const formattedEndDate = endDate.toFormat('d MMMM, yyyy');
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment slot="intro" let:C>
        <C.IntroContainer>
          <C.HeaderContainer class="mb-10">
            <C.Title>{descriptionBlock.name}</C.Title>
            <C.Subtitle weight="light"
              >{formattedStartDate} - {formattedEndDate}</C.Subtitle
            >
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
