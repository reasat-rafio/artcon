<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '../Quote.svelte';
  import VrExhibitionCta from '../VRExhibitionCTA.svelte';
  import DescriptionBlock from '../DescriptionBlock.svelte';

  export let props: SummaryProps;
  let { quote, descriptionBlock, vrExhibitionnCta } = props;
</script>

<section>
  <div class="container">
    <Quote props={quote} />
    <!-- <DescriptionBlock props={descriptionBlock.description}>
    </DescriptionBlock>
    <VrExhibitionCta props={vrExhibitionnCta} /> -->
  </div>
</section>
