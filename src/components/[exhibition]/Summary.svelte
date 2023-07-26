<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '../Quote.svelte';
  import VrExhibitionCta from '../VRExhibitionCTA.svelte';
  import DescriptionBlock from '../DescriptionBlock.svelte';
  import H4 from '../ui/H4.svelte';
  import BodyText from '../ui/BodyText.svelte';
  import { DateTime } from 'luxon';

  export let props: SummaryProps;
  let { quote, descriptionBlock, vrExhibitionnCta } = props;

  const startDate = DateTime.fromISO(descriptionBlock.startDate);
  const endDate = DateTime.fromISO(descriptionBlock.endDate);

  const formattedStartDate = startDate.toFormat('d MMMM');
  const formattedEndDate = endDate.toFormat('d MMMM, yyyy');
</script>

<section>
  <div class="container">
    <Quote class="mb-xl" props={quote} />

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

    <!-- <VrExhibitionCta props={vrExhibitionnCta} /> -->
  </div>
</section>
