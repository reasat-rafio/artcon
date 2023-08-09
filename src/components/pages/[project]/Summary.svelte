<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import VrExhibition from '@/components/VRExhibition.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { SummaryProps } from '@/lib/types/projectDetail.types';
  import { DateTime } from 'luxon';

  interface SProps extends SummaryProps {
    startDate: string;
    endDate?: string;
  }

  export let props: SProps;
  let { quote, vrExhibition, descriptionBlock, startDate, endDate } = props;

  const s = DateTime.fromISO(startDate);
  const e = endDate ? DateTime.fromISO(endDate) : null;

  const formattedStartDate = s.toFormat('d MMMM');
  const formattedEndDate = e ? e.toFormat('d MMMM, yyyy') : null;
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
              >{formattedStartDate}
              {#if formattedEndDate}
                - {formattedEndDate}
              {/if}
            </C.Subtitle>
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
          <C.Description>{descriptionBlock.description}</C.Description>
        </C.DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VrExhibition {vrExhibition} />
  </div>
</section>
