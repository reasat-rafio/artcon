<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import VRExhibition from '@/components/VRExhibition.svelte';
  import { DateTime } from 'luxon';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  export let props: SummaryProps;
  let { quote, descriptionBlock, vrExhibition } = props;

  const startDate = DateTime.fromISO(descriptionBlock.startDate);
  const endDate = DateTime.fromISO(descriptionBlock.endDate);

  const formattedStartDate = startDate.toFormat('d MMMM');
  const formattedEndDate = endDate.toFormat('d MMMM, yyyy');
</script>

<section class="py-xl">
  <div class="container">
    <Quote class="mb-xl" {quote} />

    <DescriptionBlock class="mb-xl">
      <svelte:fragment
        slot="intro"
        let:IntroContainer
        let:HeaderContainer
        let:Title
        let:Subtitle
      >
        <IntroContainer>
          <HeaderContainer class="mb-10">
            <Title>{descriptionBlock.name}</Title>
            <Subtitle weight="light"
              >{formattedStartDate} - {formattedEndDate}</Subtitle
            >
          </HeaderContainer>
          <div class="space-y-4">
            {#each descriptionBlock.moreInformations as { key, value }}
              <div>
                <Subtitle
                  weight="light"
                  class="!leading-tight !text-sonic-silver">{key}</Subtitle
                >
                <Subtitle weight="light">{value}</Subtitle>
              </div>
            {/each}
          </div>
        </IntroContainer>
      </svelte:fragment>
      <svelte:fragment
        slot="description"
        let:DescriptionContainer
        let:Description
      >
        <DescriptionContainer>
          <Description>{descriptionBlock.description}</Description>
        </DescriptionContainer>
      </svelte:fragment>
    </DescriptionBlock>

    <VRExhibition {vrExhibition} />
  </div>
</section>
