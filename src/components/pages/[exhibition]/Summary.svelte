<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import VRExhibition from '@/components/VRExhibition.svelte';
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import { DateTime } from 'luxon';

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

    <DescriptionBlock class="mb-xl" description={descriptionBlock.description}>
      <div class="mb-10 space-y-2">
        <H4>{descriptionBlock.name}</H4>
        <BodyText weight="light"
          >{formattedStartDate} - {formattedEndDate}</BodyText
        >
      </div>

      <div class="space-y-4">
        {#each descriptionBlock.moreInformations as { key, value }}
          <div>
            <BodyText weight="light" class="!leading-tight !text-sonic-silver"
              >{key}</BodyText
            >
            <BodyText weight="light">{value}</BodyText>
          </div>
        {/each}
      </div>
    </DescriptionBlock>

    <VRExhibition {vrExhibition} />
  </div>
</section>
